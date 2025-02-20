import {
  WarningCard,
  WarningContentWrapper,
  WarningLabel,
} from './Warning'
import Link from 'next/link'
import { getBeaconChainExplorer, SELECTED_CHAIN } from '@/utils/config'
import { useFilterVanillaProposals } from '@/hooks/useFilterVanillaProposals'
import { daysSinceGivenSlot } from '@/utils/slotsTime'
import { useDiscourseLinkExists } from '@/hooks/useDiscourseLinkExists'
import { Proposal } from '@/client/api/schemas'

interface VanillaWarningsProps {
  vanillaProposals: Proposal[]
  address: `0x${string}` | undefined
  latestProposalData: Proposal
}

export default function VanillaWarnings({
  vanillaProposals,
  address,
  latestProposalData,
}: VanillaWarningsProps) {
  const {
    filteredVanillaProposals,
    showVanillaWarning,
    daysSinceFirstVanilla,
  } = useFilterVanillaProposals(vanillaProposals)

  const islatestProposalVanilla = latestProposalData?.rewardType === 'vanila'
  const { banProposalExists, banProposalURL } = useDiscourseLinkExists(address)

  return (
    <>
      {/* LAST PROPOSAL VANILLA */}
      <WarningCard
        title="Last block proposal was Vanilla"
        variant="caution"
        href="https://docs.dappnode.io/docs/smooth/deep-dive-into-smooth/vanilla-blocks"
        showIf={islatestProposalVanilla}>
        <WarningContentWrapper>
          <WarningLabel variant="caution">
            <div className="flex flex-row gap-2">
              <p>Block</p>
              <Link
                target="_blank"
                className="flex flex-row font-bold text-DAppPurple-900 underline"
                href={getBeaconChainExplorer(
                  'block',
                  latestProposalData?.block.toString()
                )}>
                {latestProposalData?.block.toString()}
              </Link>
            </div>
            <div className="flex flex-row gap-2">
              <p>
                <span className="hidden md:inline-block">was proposed</span> by
                validator
              </p>
              <Link
                target="_blank"
                className="flex flex-row font-bold text-DAppPurple-900 underline"
                href={getBeaconChainExplorer(
                  'validator',
                  latestProposalData?.validatorIndex.toString()
                )}>
                #{latestProposalData?.validatorIndex.toString()}{' '}
              </Link>
            </div>
            <p>{daysSinceGivenSlot(latestProposalData?.slot)} days ago</p>
          </WarningLabel>
          <p>
            Your validators are at risk of being banned from the pool due to a
            Vanilla block proposal.{' '}
          </p>{' '}
          {SELECTED_CHAIN === 'mainnet' && banProposalExists && (
            <p className="flex flex-row gap-1">
              You can <b>check your ban proposal</b>{' '}
              <Link
                className="flex flex-row font-bold text-DAppPurple-900 underline"
                href={banProposalURL}
                target="_blank">
                here{' '}
              </Link>
            </p>
          )}
          <p>
            Please review your setup and ensure that multiple MEV relays are
            activated.
          </p>
        </WarningContentWrapper>{' '}
      </WarningCard>
      {/* VANILLA PROPOSAL WITHIN - TIME */}
      <WarningCard
        title="You've proposed Vanilla blocks"
        variant="caution"
        href="https://docs.dappnode.io/docs/smooth/deep-dive-into-smooth/vanilla-blocks"
        showIf={showVanillaWarning && !islatestProposalVanilla}>
        <WarningContentWrapper>
          {' '}
          <p className="flex flex-row gap-1">
            {' '}
            <span className="hidden md:block">You have proposed</span>{' '}
            <b>{filteredVanillaProposals?.length}</b> Vanilla block/s within{' '}
            <span className="hidden md:block">the last</span>
            <b>{daysSinceFirstVanilla}</b>days:
          </p>
          {filteredVanillaProposals.map((proposal) => (
            <WarningLabel variant="caution" key={proposal.slot}>
              <div className="flex flex-row gap-2">
                <p>Block</p>
                <Link
                  target="_blank"
                  className="flex flex-row font-bold text-DAppPurple-900 underline"
                  href={getBeaconChainExplorer(
                    'block',
                    proposal.block.toString()
                  )}>
                  {proposal.block.toString()}
                </Link>
              </div>
              <div className="flex flex-row gap-2">
                <p>
                  <span className="hidden md:inline-block"> was proposed</span>{' '}
                  by validator
                </p>
                <Link
                  target="_blank"
                  className="flex flex-row font-bold text-DAppPurple-900 underline"
                  href={getBeaconChainExplorer(
                    'validator',
                    proposal.validatorIndex.toString()
                  )}>
                  #{proposal.validatorIndex.toString()}
                </Link>
              </div>
              <p>{daysSinceGivenSlot(proposal.slot)} days ago</p>
            </WarningLabel>
          ))}
          <p>
            Repeated vanilla block proposals like this may result in your
            validators being banned from smooth.
          </p>
          <p className="flex flex-row gap-1">
            Check out Smooth&#39;s new
            <Link
              target="_blank"
              className="flex flex-row font-bold text-DAppPurple-900 underline"
              href="https://snapshot.box/#/s:dao.smooth.dappnode.eth/proposal/0xddd71930ac1a2876cc7e012861320a19b24fc2c4cc8289060c626737413251a3">
              Terms of Use
            </Link>{' '}
            for more details
          </p>
          <p>
            To avoid being banned, check your setup and ensure that multiple MEV
            relays are activated.
          </p>
        </WarningContentWrapper>{' '}
      </WarningCard>{' '}
    </>
  )
}
