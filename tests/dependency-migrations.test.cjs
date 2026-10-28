const assert = require('node:assert/strict')
const { randomBytes } = require('node:crypto')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const { test } = require('node:test')
const { runInThisContext } = require('node:vm')
const ts = require('typescript')
const { Wallet } = require('ethers')
const { SiweMessage } = require('siwe')

// Load the actual migrated TypeScript modules, substituting only their app
// boundaries. No RPC calls, browser wallet, or listening server are needed.
function loadModule(filename, mocks = {}, env = process.env) {
  const source = readFileSync(path.join(__dirname, '..', filename), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  })
  const module = { exports: {} }
  const execute = runInThisContext(
    `(function(require, module, exports, process) {\n${outputText}\n})`,
    { filename }
  )
  execute(
    (name) => (name in mocks ? mocks[name] : require(name)),
    module,
    module.exports,
    { env }
  )
  return module.exports
}

const web3 = loadModule('src/utils/web3.ts', {
  './config': { SELECTED_CHAIN: 'mainnet' },
})

test('ether formatting handles missing values and integer unit conversion', () => {
  assert.equal(web3.weiToEth(undefined), 0)
  assert.equal(web3.weiToEth(null), 0)
  assert.equal(web3.weiToEth('1000000000000000000'), 1)
  assert.equal(web3.weiToEth('1234567890000000000'), 1.23456789)
  assert.equal(web3.gweiToEth('1234567890'), 1.23456789)
})

test('monthly rewards retain fee scaling, integer rounding, and zero-stake behavior', () => {
  const { AverageRewardsCard } = loadModule(
    'src/components/cards/SummaryCard/RewardsCard/AverageRewardsCard.tsx',
    { '.': { AverageCard: () => null } }
  )
  const props = {
    isLoading: false,
    isError: false,
    totalRewardsSent30daysWei: '1000000000000000001',
    totalEffectiveBalanceGwei: '96000000000',
    poolFeesPercent: 150,
  }
  const card = AverageRewardsCard(props)
  assert.equal(card.props.ethRewardWei, '328333333333333333')
  assert.equal(card.props.adjustedPoolFeesPercent, 1.5)
  assert.equal(
    AverageRewardsCard({
      ...props,
      totalEffectiveBalanceGwei: '0',
    }).props.ethRewardWei,
    undefined
  )
  assert.equal(
    AverageRewardsCard({
      ...props,
      totalRewardsSent30daysWei: undefined,
    }).props.ethRewardWei,
    undefined
  )
})

test('bulk subscription sends exact wei without a floating-point round trip', async () => {
  const writes = []
  const { useHandleSubscriptionStatus } = loadModule(
    'src/hooks/useHandleSubscriptionStatus.ts',
    {
      react: { useEffect: () => {}, useCallback: (callback) => callback },
      wagmi: {
        useAccount: () => ({
          address: '0x0000000000000000000000000000000000000001',
        }),
        useWriteContract: () => ({
          writeContractAsync: async (args) => writes.push(args),
        }),
        useWaitForTransactionReceipt: () => ({}),
      },
      '@tanstack/react-query': {
        useQuery: () => ({ data: { collateralInWei: '100000000000000001' } }),
        useQueryClient: () => ({}),
      },
      '@/contract/abi.json': [],
      '@/client/api/queryFunctions': { fetchConfig: () => {} },
      '@/utils/config': {
        SMOOTHING_POOL_ADDRESS: '0x0000000000000000000000000000000000000002',
      },
    }
  )
  const subscription = useHandleSubscriptionStatus('sub', [1, 2, 3])
  assert.equal(subscription.totalDepositInString, '0.300000000000000003')
  await subscription.handleSubscription()
  assert.equal(writes[0].value, 300000000000000003n)
  assert.equal(writes[0].functionName, 'subscribeValidators')
  await useHandleSubscriptionStatus('unsub', 1).handleSubscription()
  assert.equal(writes[1].value, undefined)
  assert.equal(writes[1].functionName, 'unsubscribeValidator')
})

const sessionConfig = loadModule(
  'src/utils/config.ts',
  {},
  {
    NEXT_PUBLIC_SELECTED_CHAIN: 'mainnet',
    NEXT_PUBLIC_SMOOTHING_POOL_ADDRESS:
      '0x0000000000000000000000000000000000000001',
  }
).IRON_SESSION_CONFIG
const sessionOptions = {
  ...sessionConfig,
  password: randomBytes(32).toString('hex'),
  cookieOptions: { secure: false },
}
const handlers = Object.fromEntries(
  ['nonce', 'verify', 'user', 'logout'].map((name) => [
    name,
    loadModule(`src/pages/api/siwe/${name}.ts`, {
      '@/utils/config': { IRON_SESSION_CONFIG: sessionOptions },
    }).default,
  ])
)

async function request(route, { method = 'GET', cookie = '', body } = {}) {
  const headers = {}
  const response = {
    statusCode: 200,
    setHeader(name, value) {
      headers[name.toLowerCase()] = value
    },
    getHeader(name) {
      return headers[name.toLowerCase()]
    },
    status(code) {
      this.statusCode = code
      return this
    },
    send(value) {
      this.body = value
      return this
    },
    json(value) {
      this.body = value
      return this
    },
    end(value) {
      this.body = value
      return this
    },
  }
  await handlers[route]({ method, headers: { cookie }, body }, response)
  const cookies = headers['set-cookie'] ?? []
  response.cookie = (Array.isArray(cookies) ? cookies : [cookies])
    .map((value) => value.split(';')[0])
    .join('; ')
  return response
}

test('SIWE nonce, signature verification, session reading, and logout work together', async () => {
  assert.equal(sessionOptions.cookieName, 'smooth-siwe')
  const nonce = await request('nonce')
  assert.equal(typeof nonce.body, 'string')
  assert.match(nonce.cookie, /^smooth-siwe=/)
  const wallet = Wallet.createRandom()
  const message = new SiweMessage({
    domain: 'localhost',
    address: wallet.address,
    statement: 'Sign in to Smooth',
    uri: 'http://localhost',
    version: '1',
    chainId: 1,
    nonce: nonce.body,
  }).prepareMessage()
  const signature = await wallet.signMessage(message)
  const verified = await request('verify', {
    method: 'POST',
    cookie: nonce.cookie,
    body: { message, signature },
  })
  assert.equal(verified.body.ok, true)
  const user = await request('user', { cookie: verified.cookie })
  assert.equal(user.body.address, wallet.address)
  const logout = await request('logout', { cookie: verified.cookie })
  assert.match(logout.cookie, /^smooth-siwe=$/)
  const anonymous = await request('user', { cookie: logout.cookie })
  assert.equal(anonymous.body.address, undefined)

  const missingNonce = await request('verify', {
    method: 'POST',
    body: { message, signature },
  })
  assert.equal(missingNonce.statusCode, 422)
  const wrongNonce = await request('nonce')
  const rejected = await request('verify', {
    method: 'POST',
    cookie: wrongNonce.cookie,
    body: { message, signature },
  })
  assert.equal(rejected.body.ok, false)
  assert.equal(rejected.cookie, '')
  const forged = await request('verify', {
    method: 'POST',
    cookie: nonce.cookie,
    body: {
      message,
      signature: await Wallet.createRandom().signMessage(message),
    },
  })
  assert.equal(forged.body.ok, false)
  assert.equal(forged.cookie, '')
})

test('SIWE endpoints reject unsupported methods', async () => {
  for (const route of ['nonce', 'user', 'logout', 'verify']) {
    const response = await request(route, { method: 'PUT' })
    assert.equal(response.statusCode, 405)
  }
})
