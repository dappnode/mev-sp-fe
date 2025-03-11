import BanWarnings from '../Warnings/BanWarnings'
import VanillaWarnings from '../Warnings/VanillaWarnings'
import { useAccount } from 'wagmi'
import { useGetAddressProposals } from '@/hooks/useGetAddressProposals'

export default function DashboardWarnings() {
  const { address } = useAccount()

  const {
    vanillaProposals,
    // missedProposals,
    withdrawalAddressProposals,
    wrongFeeProposals,
  } = useGetAddressProposals(address)

  const latestProposalData = withdrawalAddressProposals[0]

  return (
    <>
      <BanWarnings wrongFeeProposals={wrongFeeProposals} />
      <VanillaWarnings
        address={address}
        latestProposalData={latestProposalData}
        vanillaProposals={vanillaProposals}
      />
    </>
  )
}
