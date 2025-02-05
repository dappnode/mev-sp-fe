import { useGetAddressProposals } from '@/hooks/useGetAddressProposals'
import { DashboardWarning } from '../banners/DashboardWarning'
import { use, useEffect, useMemo, useState } from 'react'
import { getSlotUnixTime } from '@/utils/slotsTime'
import Link from 'next/link'
import { ExternalLinkIcon } from '../icons/ExternalLinkIcon'
import { getBeaconChainExplorer } from '@/utils/config'
import { useAllValidatorsData } from '../charts/hooks/useAllValidatorsData'
import { useQuery } from '@tanstack/react-query'
import { fetchValidatorsByDepositor } from '@/client/api/queryFunctions'
import { useAccount } from 'wagmi'

export default function BlockProposalWarnings() {
  const {
    vanillaProposals,
    missedProposals,
    withdrawalAddressProposals,
    wrongFeeProposals,
  } = useGetAddressProposals()
  const [showVanillaWarning, setShowVanillaWarning] = useState(false)

  const { address } = useAccount()
  const validatorsQuery = useQuery({
    queryKey: ['user-validators', address],
    queryFn: () => fetchValidatorsByDepositor(address),
    enabled: !!address,
  })
  console.log('validatorsQuery', validatorsQuery.data)

  const activeValidators = validatorsQuery.data?.filter((validator) => {
    return (
      validator.status === 'active' ||
      validator.status === 'yellowCard' ||
      validator.status === 'redCard'
    )
  })

  const activeValidatorsDaysLeftMap = (numValidators: number) => {
    if (numValidators >= 1) {
      return 7 * 30 // 7 months
    } else if (numValidators >= 2 && numValidators <= 9) {
      return 5 * 30 // 5 months
    } else if (numValidators > 9) {
      return 1 * 30 // 1 months
    } else {
      return 0
    }
  }

  const daysSinceGivenSlot = (slot: number) => {
    const slotTime = getSlotUnixTime(slot)

    const currentTime = Math.floor(Date.now() / 1000)
    const timeDifference = currentTime - slotTime
    return Math.floor(timeDifference / 86400)
  }

  const LatestProposalData = withdrawalAddressProposals[0]
  console.log('LatestProposalData', LatestProposalData)

  const islatestProposalVanilla = LatestProposalData?.rewardType === 'vanila'

  const islatestProposalMissed =
    LatestProposalData?.blockType === 'missedproposal'

  const islatestProposalWrongFee =
    LatestProposalData?.blockType === 'wrongfeerecipient'

  const { validatorsData } = useAllValidatorsData()
  console.log('validatorsData', validatorsData)

  useEffect(() => {
    if (activeValidators && vanillaProposals[0]) {
      setShowVanillaWarning(
        daysSinceGivenSlot(vanillaProposals[0].slot) <
          activeValidatorsDaysLeftMap(activeValidators.length)
      )
    }
  }, [vanillaProposals, activeValidators])

  return (
    <>
      <DashboardWarning
        title="Last block proposed was a Vanilla"
        href={' '}
        showIf={islatestProposalVanilla}>
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full flex-row justify-evenly font-semibold xl:w-1/2">
            <p>
              Validator:{' '}
              <span className="text-DAppPurple-900  ">
                {LatestProposalData?.slot.toString()}
              </span>
            </p>
            <p>
              Slot:{' '}
              <span className="text-DAppPurple-900  ">
                {LatestProposalData?.slot.toString()}
              </span>
            </p>
            <p>
              Block:{' '}
              <span className="text-DAppPurple-900  ">
                {' '}
                {LatestProposalData?.block.toString()}
              </span>
            </p>
            <p>
              <Link
                target="_blank"
                className="flex flex-row font-bold text-DAppPurple-900 hover:underline"
                href={getBeaconChainExplorer(
                  'block',
                  LatestProposalData?.block.toString()
                )}>
                See more
                <ExternalLinkIcon />
              </Link>
            </p>
          </div>
          <p>
            You are at risk of being banned from the pool due to a Vanilla block
            proposal.
          </p>
          <p>
            Please review your setup and ensure that MEV is properly configured.
          </p>
        </div>
      </DashboardWarning>
      
      <DashboardWarning
        title="You've proposed a Vanilla block"
        showIf={showVanillaWarning}>
        <div className="flex flex-col items-center gap-2">
          <p className='flex flex-row gap-2'>
            {' '}
            You have proposed a Vanilla block{' '}
            <b>{daysSinceGivenSlot(vanillaProposals[0]?.slot)}</b> days ago.
            <Link
                target="_blank"
                className="flex flex-row font-bold text-DAppPurple-900 hover:underline"
                href={getBeaconChainExplorer(
                  'block',
                  vanillaProposals[0]?.block.toString()
                )}>
                See more
                <ExternalLinkIcon />
              </Link>
          </p>
          <p>
            To avoid being banned, check your setup and ensure that MEV is
            properly configured.
          </p>
          <p>
            Repeated vanilla block proposals like this could lead to your
            account being banned from Smooth.
          </p>
        </div>
      </DashboardWarning>{' '}
    </>
  )
}
