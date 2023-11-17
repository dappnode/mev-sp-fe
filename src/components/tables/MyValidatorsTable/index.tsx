/* eslint-disable no-else-return */
/* eslint-disable react/button-has-type */
import { WarningIcon } from './components/WarningIcon'
import { Skeleton } from './components/Skeleton'
import { NotConnectedWarning } from './components/NotConnectedWarning'
import { ServerErrorWarning } from './components/ServerErrorWarning'
import { headerTooltip, PAGE_SIZE } from './config'
import { TableLayout } from '../components/Table'
import { HeaderTooltip } from '../components/HeaderTooltip'
import { useMemo, useState } from 'react'
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
  columnHelper.accessor('checkbox', {
    header: () => <input type="checkbox" />,
    cell: (info) => {
      console.log('Checkbox Cell Info:', info) // Log the info object to the console go to > row > original

      return (
        <input
          checked={info.row.getIsSelected()}
          type="checkbox"
          onChange={() => info.row.toggleSelected()}
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
  const { searchInput, setSearchInput, debouncedSearchInput } = useSearchInput()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRow, setSelectedRow] = useState<Validator | null>(null)

  const handleSubscribeOrUnsubscribe = () => {
    if (selectedRow) {
      const { validatorKey, validatorId, subscribed } = selectedRow

      return (
        <button
          onClick={() =>
            handleSubscribeOrUnsubscribeClick(
              validatorId,
              validatorKey,
              subscribed
            )
          }>
          {subscribed ? 'Unsubscribe' : 'Subscribe'}
        </button>
      )
    }

    return null
  }

  const handleSubscribeOrUnsubscribeClick = (
    validatorId: number,
    validatorKey: string,
    isSubscribed: boolean
  ) => {
    // You can open your modal here based on the isSubscribed status
    if (isSubscribed) {
      // Open modal MultiDepositDialog
      console.log(`Opening Unsubscribe modal for validator ${validatorId}`)
    } else {
      // Open modal MultiDepositDialog
      console.log(
        `Opening Subscribe modal for validator ${validatorId} with key ${validatorKey}`
      )
    }
  }

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
    <>
      {handleSubscribeOrUnsubscribe()}

      <TableLayout
        className="h-[440px]"
        data={data ?? []}
        searchInput={searchInput}
        searchPlaceholder="Search Validator"
        setSearchInput={setSearchInput}
        table={table}
        title="My Validators"
      />
    </>
  )
}
