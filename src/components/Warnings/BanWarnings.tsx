import { WarningCard, WarningContentWrapper, WarningLabel } from './Warning'
import Link from 'next/link'
import { getBeaconChainExplorer } from '@/utils/config'
import { useFilterValidatorsBannedByDAO } from '@/hooks/useFilterValidatorsBannedByDAO'
import { Proposal } from '@/client/api/schemas'

interface BanWarningsProps {
  wrongFeeProposals: Proposal[]
}

export default function BanWarnings({ wrongFeeProposals }: BanWarningsProps) {
  const validatorsBannedByDAO =
    useFilterValidatorsBannedByDAO(wrongFeeProposals)
  return (
    <>
      {/* BANNED BY DAO */}
      <WarningCard
        title="At least one of your validators has been banned by the DAO"
        variant="danger"
        href="https://docs.dappnode.io/docs/smooth/deep-dive-into-smooth/vanilla-blocks"
        showIf={validatorsBannedByDAO.length > 0}>
        {' '}
        <WarningContentWrapper>
          <p>
            The following validators were banned by the DAO because of vanilla
            blocks proposals:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
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
          </div>

          <p className="flex flex-row gap-1">
            You can check your ban voting process{' '}
            <Link
              className="flex flex-row font-bold text-DAppPurple-900 underline"
              href="https://snapshot.box/#/s:dao.smooth.dappnode.eth"
              target="_blank">
              here{' '}
            </Link>
          </p>

          <p className="flex flex-row gap-1">
            To get unbanned,{' '}
            <Link
              className="flex flex-row font-bold text-DAppPurple-900 underline"
              href="/donate">
              donate{' '}
            </Link>{' '}
            the owed amount of ETH specified in the voting process.
          </p>
        </WarningContentWrapper>{' '}
      </WarningCard>
    </>
  )
}
