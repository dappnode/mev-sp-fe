import { MyValidatorsTable } from '.'
import { Web3Decorator } from 'storybook/decorators/Web3Decorator'
import type { Validator } from '../types'
import type { Meta, StoryObj } from '@storybook/react'

const data: Validator[] = [
  {
    address: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    pending: 1.21,
    accumulated: 0.12,
    warning: 'none',
    validatorId: 1,
    validatorKey: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    subscribed: true,
  },
  {
    address: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    pending: 1.21,
    accumulated: 0.12,
    warning: 'banned',
    validatorId: 1,
    validatorKey: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    subscribed: true,
  },
  {
    address: '0x388C818CA8B9251b393131C08a736A67ccB19297',
    pending: 1.21,
    accumulated: 0.12,
    warning: 'yellow',
    validatorId: 2,
    validatorKey: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    subscribed: true,
  },
  {
    address: '0x97C28c835CE99b23F63414f8989ec410Ab41f52D',
    pending: 3.32,
    accumulated: 3.42,
    validatorId: 3,
    validatorKey: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    warning: 'red',
    subscribed: false,
  },
  {
    address: '0xE7d3982E214F9DFD53d23a7f72851a7044072250',
    pending: 1.21,
    accumulated: 0.12,
    validatorId: 4,
    validatorKey: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    warning: 'yellow',
    subscribed: true,
  },
  {
    address: '0xD2f43b11122C56D12d4cCef4Be503C4d47D33636',
    pending: 1.21,
    accumulated: 0.12,
    validatorId: 5,
    validatorKey: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    warning: 'none',
    subscribed: false,
  },
  {
    address: '0x492d818f545454D50F6e90bCC8b22692BDc22030',
    pending: 3.32,
    accumulated: 3.42,
    validatorId: 6,
    validatorKey: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    warning: 'red',
    subscribed: false,
  },
  {
    address: '0x30614bc1e56bf9f30f2dda7898b520a20b560ef3',
    pending: 3.32,
    accumulated: 3.42,
    validatorId: 7,
    validatorKey: '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5',
    warning: 'yellow',
    subscribed: false,
  },
]

const meta: Meta<typeof MyValidatorsTable> = {
  title: 'table/MyValidatorsTable',
  component: MyValidatorsTable,
}

export default meta
type Story = StoryObj<typeof MyValidatorsTable>

export const Primary: Story = {
  decorators: [Web3Decorator],
  args: {
    isConnected: true,
    data,
  },
}

export const Loading: Story = {
  decorators: [Web3Decorator],
  args: {
    isConnected: true,
    isLoading: true,
  },
}

export const NotConnected: Story = {
  decorators: [Web3Decorator],
  args: {
    isConnected: false,
  },
}
