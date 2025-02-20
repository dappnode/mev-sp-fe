import {
    WarningCard,
    WarningContentWrapper,
    WarningLabel,
} from './Warning'
import Link from 'next/link'
import { getBeaconChainExplorer, SELECTED_CHAIN } from '@/utils/config'
import { useDiscourseLinkExists } from '@/hooks/useDiscourseLinkExists'
import { useFilterValidatorsBannedByDAO } from '@/hooks/useFilterValidatorsBannedByDAO'
import { Proposal } from '@/client/api/schemas'

interface BanWarningsProps {
  wrongFeeProposals: Proposal[]
  address: `0x${string}` | undefined
}

export default function BanWarnings({
  wrongFeeProposals,
  address,
}: BanWarningsProps) {
  const validatorsBannedByDAO =
    useFilterValidatorsBannedByDAO(wrongFeeProposals)

  const { banProposalExists, banProposalURL } = useDiscourseLinkExists(address)

  return (
    <>
      {/* BANNED BY DAO */}
      <WarningCard
        title="One of your validators has been banned by the DAO"
        variant="danger"
        href="https://docs.dappnode.io/docs/smooth/deep-dive-into-smooth/vanilla-blocks"
        showIf={false}>
        {' '}
        <WarningContentWrapper>
          <p>
            The following validators were banned by the DAO because of vanilla
            blocks proposals:
          </p>
          {validatorsBannedByDAO.map((validator) => (
            <WarningLabel variant="danger" key={validator.validatorIndex}>
              <p>Validator</p>
              <Link
                target="_blank"
                className="flex flex-row font-bold text-DAppPurple-900 underline"
                href={getBeaconChainExplorer(
                  'validator',
                  validator.validatorIndex.toString()
                )}>
                #{validator.validatorIndex.toString()}{' '}
              </Link>
            </WarningLabel>
          ))}
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
        </WarningContentWrapper>{' '}
      </WarningCard>
    </>
  )
}
