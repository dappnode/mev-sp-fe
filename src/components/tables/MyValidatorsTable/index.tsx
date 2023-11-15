import { WarningIcon } from './components/WarningIcon'
import { Skeleton } from './components/Skeleton'
import { NotConnectedWarning } from './components/NotConnectedWarning'
import { ServerErrorWarning } from './components/ServerErrorWarning'
import { headerTooltip, PAGE_SIZE } from './config'
import { TableLayout } from '../components/Table'
import { HeaderTooltip } from '../components/HeaderTooltip'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { SubscribeToMevDialog } from '@/components/dialogs/SubscribeToMevDialog'
import { UnsubscribeToMevDialog } from '@/components/dialogs/UnsubscribeToMevDialog'
import { useSearchInput } from '@/hooks/useSearchInput'
import { addEthSuffix, shortenEthAddress } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { getBeaconChainExplorer } from '@/utils/config'
import type { Validator } from '../types'

const columnHelper = createColumnHelper<Validator>()

const columns = [
  columnHelper.accessor('address', {
    header: () => (
      <HeaderTooltip header="Address" tooltip={headerTooltip.address} />
    ),
    cell: (info) => {
      const address = info.getValue()
      const shortAddress = shortenEthAddress(address, 22, 0)

      return (
        <Link
          className="font-medium underline"
          href={getBeaconChainExplorer('validator', address)}
          rel="noopener noreferrer"
          target="_blank">
          {shortAddress}
        </Link>
      )
    },
  }),
  columnHelper.accessor('pending', {
    header: () => (
      <HeaderTooltip header="Pending" tooltip={headerTooltip.pending} />
    ),
    cell: (info) => addEthSuffix(toFixedNoTrailingZeros(info.getValue(), 4)),
  }),
  columnHelper.accessor('accumulated', {
    header: () => (
      <HeaderTooltip header="Accumulated" tooltip={headerTooltip.accumulated} />
    ),
    cell: (info) => addEthSuffix(toFixedNoTrailingZeros(info.getValue(), 4)),
  }),
  columnHelper.accessor('warning', {
    header: () => (
      <HeaderTooltip header="Warning" tooltip={headerTooltip?.warning} />
    ),
    cell: (info) => <WarningIcon warning={info.getValue()} />,
  }),
  columnHelper.accessor('subscribed', {
    header: '',
    cell: (info) => {
      const isSubscribed = info.getValue()
      const { validatorKey, validatorId, warning } = info.row.original
      const isBanned = warning === 'banned'
      if (isBanned) return null
      return isSubscribed ? (
        <UnsubscribeToMevDialog validatorId={validatorId} />
      ) : (
        <SubscribeToMevDialog
          validatorId={validatorId}
          validatorKey={validatorKey}
        />
      )
    },
  }),
]

interface MyValidatorsTableProps {
  data?: Validator[]
  isConnected?: boolean
  isLoading?: boolean
  serverError?: boolean
}

export function MyValidatorsTable({
  data,
  isConnected,
  isLoading,
  serverError,
}: MyValidatorsTableProps) {
  const [selectedValidators, setSelectedValidators] = useState<Set<unknown>>(new Set());
  const { searchInput, setSearchInput, debouncedSearchInput } = useSearchInput()
  const filteredData = useMemo(
    () =>
      data
        ?.filter((row) => {
          const address = row.address.toLowerCase()
          const search = debouncedSearchInput.toLowerCase()
          return address.includes(search)
        })
        // Sort by address
        .sort((a, b) => {
          if (a.address.toLowerCase() < b.address.toLowerCase()) return -1
          if (a.address.toLowerCase() > b.address.toLowerCase()) return 1
          return 0
        })
        // Sort by subscribed
        .sort((a, b) => {
          if (a.subscribed && !b.subscribed) return -1
          if (!a.subscribed && b.subscribed) return 1
          return 0
        }),

    [debouncedSearchInput, data]
  )
  const checkboxColumn = columnHelper.accessor('validatorId', {
    header: () => (
      <input
        type="checkbox"
        onChange={(e) => {
          const newSelected = e.target.checked ? new Set(data?.map(v => v.validatorId)) : new Set();
          setSelectedValidators(newSelected);
        }}
      />
    ),
    cell: (info) => (
      <input
        type="checkbox"
        checked={selectedValidators.has(info.row.original.validatorId)}
        onChange={(e) => {
          const newSelected = new Set(selectedValidators);
          if (e.target.checked) {
            newSelected.add(info.row.original.validatorId);
          } else {
            newSelected.delete(info.row.original.validatorId);
          }
          setSelectedValidators(newSelected);
        }}
      />
    ),
 });
 
 columns.unshift(checkboxColumn);

  const table = useReactTable({
    columns,
    data: filteredData ?? [],
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (!isConnected) {
    return <NotConnectedWarning title="My Validators" />
  }

  if (isLoading) {
    return <Skeleton title="My Validators" />
  }

  if (serverError) {
    return <ServerErrorWarning title="My Validators" />
  }

  return (
    <TableLayout
      className="h-[440px]"
      data={data ?? []}
      searchInput={searchInput}
      searchPlaceholder="Search Validator"
      setSearchInput={setSearchInput}
      table={table}
      title="My Validators"
    />
  )
}

