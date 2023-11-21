import { PAGE_SIZE, headerTooltip } from './config'
import { Skeleton } from './components/Skeleton'
import { TableLayout } from '../components/Table'
import { HeaderTooltip } from '../components/HeaderTooltip'
import Link from 'next/link'
import { useMemo } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useSearchInput } from '@/hooks/useSearchInput'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { getBeaconChainExplorer } from '@/utils/config'
import { shortenEthAddress } from '@/utils/web3'
import type { Donation } from '../types'


const columnHelper = createColumnHelper<Donation>()

const getDonationColumns = (blackExplorerUrl?: string) => [
    columnHelper.accessor('blockNumber', {
    header: () => <HeaderTooltip header="Block Number" tooltip={headerTooltip.blockNumber} />,
    cell: (info) => {
      const blockNumber = info.getValue()
      return (
        <Link
          className="font-medium underline"
          href={getBeaconChainExplorer('block', blockNumber)}
          rel="noopener noreferrer"
          target="_blank">
          {blockNumber.toLocaleString()}
        </Link>
      )
    },
    }),
    columnHelper.accessor('txHash', {
        header: () => <HeaderTooltip header="TxHash" tooltip={headerTooltip.txHash} />,
        cell: (info) => {
          const txHash = info.getValue()
          return (
            <Link
              className="font-medium underline"
              href={getBeaconChainExplorer('tx', txHash)}
              rel="noopener noreferrer"
              target="_blank">
              {shortenEthAddress(txHash)}
            </Link>
          )
        },
      }),
      
      columnHelper.accessor('sender', {
        header: () => <HeaderTooltip header="Sender" tooltip={headerTooltip.sender} />,
        cell: (info) => {
          const sender = info.getValue()
          return (
            <Link
              className="font-medium underline"
              href={`${blackExplorerUrl}/address/${sender}`}
              rel="noopener noreferrer"
              target="_blank">
              {shortenEthAddress(sender)}
            </Link>
          )
        },
      }),
  columnHelper.accessor('reward', {
    header: () => <HeaderTooltip header="Amount" tooltip={headerTooltip.reward} />,
    cell: (info) => {
      const reward = info.getValue()
      return <span>{toFixedNoTrailingZeros(reward, 6)} ETH</span>
    },
    }),
]

interface LatestDonationsTableProps {
  blockExplorerUrl?: string
  data?: Donation[]
  isLoading: boolean
}

export function LatestDonationsTable({
  blockExplorerUrl,
  data,
  isLoading,
}: LatestDonationsTableProps) {
  const { searchInput, setSearchInput, debouncedSearchInput } = useSearchInput()

  const filteredData = useMemo(
    () =>
      data?.filter((donation) => {
        if (!debouncedSearchInput) return true
        return donation.sender
          .toLocaleLowerCase()
          .includes(debouncedSearchInput.toLocaleLowerCase())
      }) ?? [],
    [data, debouncedSearchInput]
  )

  const table = useReactTable({
    columns: getDonationColumns(blockExplorerUrl),
    data: filteredData || [],
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  })
  if (isLoading) return <Skeleton title="Latest Smooth Donations" />

  return (
    <TableLayout
      hasFilter
      className="h-[510px]"
      data={ filteredData || []}
      searchInput={searchInput}
      searchPlaceholder="Search Sender"
      setSearchInput={setSearchInput}
      table={table}
      title="Latest Smooth Donations"
    />
  )
}


