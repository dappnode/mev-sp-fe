import { WarningIcon } from './components/WarningIcon'
import { Skeleton } from './components/Skeleton'
import { NotConnectedWarning } from './components/NotConnectedWarning'
import { ServerErrorWarning } from './components/ServerErrorWarning'
import { headerTooltip, PAGE_SIZE } from './config'
import { TableLayout } from '../components/Table'
import { HeaderTooltip } from '../components/HeaderTooltip'
import { Button } from '@/components/common/Button'
import { useMemo, useState, useCallback } from 'react'
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
import type { RowData } from '@tanstack/react-table'
import type { Validator } from '../types'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    onRowSelection: (info: RowData) => void
    rowsSelected: boolean
    selectedValidators: number[]
    allValidatorsIndex: number[]
  }
}

declare module '@tanstack/table-core' {
  interface TableMetaValidator<TData extends RowData> {
    rowsSelected: boolean
  }
}

const getUnsubscribedOrUntrackedIndices = (validators: Validator[]) => {
  return validators.reduce((acc: number[], validator: Validator): number[] => {
    if (
      validator.status === 'notsubscribed' ||
      validator.status === 'untracked'
    ) {
      return [...acc, validator.validatorId]
    }
    return acc
  }, [])
}

const columnHelper = createColumnHelper<Validator>()

const columns = [
  columnHelper.accessor('validatorKey', {
    header: '',
    cell: (info) => {
      const { table } = info
      const {
        validatorId,
        warning,
        subscribed: isSubscribed,
      } = info.row.original
      const isBanned = warning === 'banned'
      if (isSubscribed || isBanned) return null
      return (
        <input
          type="checkbox"
          name="validator"
          value={validatorId}
          defaultChecked={isSubscribed}
          key={`checkbox-${validatorId}`}
          onChange={() => {
            table.options?.meta?.onRowSelection(info)
          }}
        />
      )
    },
  }),
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
    header: (info) => {
      const validatorsSelected = info.table.options.meta?.rowsSelected
      return (
        <Button
          size="sm"
          buttonType="secondary"
          onPress={() => {
            if (validatorsSelected) {
              // subscribeSelectedValidators();
            } else {
              // subscribeAllValidators();
            }
          }}>
          <p className="text-xs">
            Subscribe {validatorsSelected ? 'Picked' : 'All'}
          </p>
        </Button>
      )
    },
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
  const [selectedValidators, setSelectedValidators] = useState<any[]>([])
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
  const onRowSelection = useCallback((info: any) => {
    const validatorId = info.row.original.validatorId
    setSelectedValidators((prevSelectedValidators) => {
      if (prevSelectedValidators.includes(validatorId)) {
        // Validator is already in the list, so remove it
        return prevSelectedValidators.filter(
          (validator: string) => validator !== validatorId
        )
      } else {
        // Validator is not in the list, so add it
        return [...prevSelectedValidators, validatorId]
      }
    })
  }, [])

  const subscribeSelectedValidators = () => {
    // Subscribe to all of the validators that are stored in the `selectedValidators` state variable.
  }


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
    meta: {
      onRowSelection,
      rowsSelected: selectedValidators.length > 0,
      selectedValidators,
      allValidatorsIndex: getUnsubscribedOrUntrackedIndices(data ?? []),
    },
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
