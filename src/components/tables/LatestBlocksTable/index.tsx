import { PAGE_SIZE, headerTooltip } from './config'
import { Skeleton } from './components/Skeleton'
import { TableLayout } from '../components/Table'
import { HeaderTooltip } from '../components/HeaderTooltip'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useSearchInput } from '@/hooks/useSearchInput'
import { addEthSuffix, shortenEthAddress } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { getBeaconChainExplorer } from '@/utils/config'
import type { Block } from '../types'

const columnHelper = createColumnHelper<Block>()

const getColumns = (blackExplorerUrl?: string) => [
  columnHelper.accessor('slot', {
    header: () => <HeaderTooltip header="Slot" tooltip={headerTooltip.slot} />,
    cell: (info) => {
      const slot = info.getValue()
      return (
        <Link
          className="font-medium underline"
          href={getBeaconChainExplorer('slot', slot)}
          rel="noopener noreferrer"
          target="_blank">
          {slot.toLocaleString()}
        </Link>
      )
    },
  }),
  columnHelper.accessor('proposer', {
    header: () => (
      <HeaderTooltip header="Proposer" tooltip={headerTooltip.proposer} />
    ),
    cell: (info) => {
      const proposer = info.getValue()
      return (
        <Link
          className="font-medium underline"
          href={`${blackExplorerUrl}/validator/${proposer.validatorIndex}`}
          rel="noopener noreferrer"
          target="_blank">
          {shortenEthAddress(proposer.validatorKey.toLocaleString())}
        </Link>
      )
    },
  }),
  columnHelper.accessor('rewardType', {
    header: () => (
      <HeaderTooltip header="Reward Type" tooltip={headerTooltip.rewardType} />
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('reward', {
    header: () => (
      <HeaderTooltip header="Reward" tooltip={headerTooltip.reward} />
    ),
    cell: (info) => addEthSuffix(toFixedNoTrailingZeros(info.getValue(), 4)),
  }),
  columnHelper.accessor('blockType', {
    header: () => <HeaderTooltip header="Block Type" />,
    cell: (info) => {
      const blockType = info.getValue()
      const formattedBlockType =
        blockType === 'okpoolproposal'
          ? 'Proposed'
          : blockType === 'missedproposal'
          ? 'Missed'
          : 'Wrong Fee'
      return formattedBlockType
    },
  }),
]

interface LatestBlocksTableProps {
  blockExplorerUrl?: string
  data?: Block[]
  isLoading: boolean
}

export function LatestBlocksTable({
  blockExplorerUrl,
  data,
  isLoading,
}: LatestBlocksTableProps) {
  const [filterValue, setFilterValue] = useState<string>(filterOptions[0].value)
  const { searchInput, setSearchInput, debouncedSearchInput } = useSearchInput()

  const filteredData = useMemo(
    () =>
      data
        ?.filter((row) => {
          const address = row.proposer.withdrawalAddress.toLowerCase()
          const search = debouncedSearchInput.toLowerCase()
          return (
            address.includes(search) &&
            (row.blockType === filterValue || filterValue === 'all')
          )
        })
        .sort((a, b) => b.slot - a.slot),
    [debouncedSearchInput, filterValue, data]
  )

  const table = useReactTable({
    columns: getColumns(blockExplorerUrl),
    data: filteredData ?? [],
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (isLoading) return <Skeleton title="Latest Blocks to SP" />

  return (
    <TableLayout
      hasFilter
      className="h-[510px]"
      data={filteredData ?? []}
      filterOptions={filterOptions}
      filterTitle="Block Type"
      filterValue={filterValue}
      searchInput={searchInput}
      searchPlaceholder="Search Proposer"
      setFilterValue={setFilterValue}
      setSearchInput={setSearchInput}
      table={table}
      title="Latest Blocks to SP"
    />
  )
}

const filterOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Proposed',
    value: 'okpoolproposal',
  },
  {
    label: 'Wrong Fee',
    value: 'wrongfeerecipient',
  },
  {
    label: 'Missed',
    value: 'missedproposal',
  },
]
