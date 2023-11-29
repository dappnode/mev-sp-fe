/* eslint-disable no-else-return */
/* eslint-disable react/button-has-type */

import { WarningIcon } from './components/WarningIcon'
import { Skeleton } from './components/Skeleton'
import { NotConnectedWarning } from './components/NotConnectedWarning'
import { ServerErrorWarning } from './components/ServerErrorWarning'
import { headerTooltip, PAGE_SIZE } from './config'
import { TableLayout } from '../components/Table'
import { HeaderTooltip } from '../components/HeaderTooltip'
import { useMemo, useState, useEffect, ChangeEventHandler } from 'react'
import Link from 'next/link'
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { SubscribeToMevDialog, MultiSubscribeToMevDialog } from '@/components/dialogs/SubscribeToMevDialog'
import { UnsubscribeToMevDialog } from '@/components/dialogs/UnsubscribeToMevDialog'
import { useSearchInput } from '@/hooks/useSearchInput'
import { addEthSuffix, shortenEthAddress } from '@/utils/web3'
import { toFixedNoTrailingZeros } from '@/utils/decimals'
import { getBeaconChainExplorer } from '@/utils/config'
import type { Validator } from '../types'

const columnHelper = createColumnHelper<Validator>()

const useTableColumns = (table: { getIsAllRowsSelected: () => boolean | undefined; getToggleAllRowsSelectedHandler: () => ChangeEventHandler<HTMLInputElement> | undefined }) => 
  useMemo(() => [
    columnHelper.accessor('checkbox', {
      header: () => (
        <input
          checked={table.getIsAllRowsSelected()}
          type="checkbox"
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: (info) => (
        <input
          checked={info.row.getIsSelected()}
          type="checkbox"
          onChange={() => info.row.toggleSelected()}
        />
      ),
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
  ], [table])


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
  const [showMultiSubscribeDialog, setShowMultiSubscribeDialog] = useState(false);
  const [selectedValidatorIds, setSelectedValidatorIds] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [columns, setColumns] = useState<ColumnDef<Validator, any>[]>([]);

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
    data: filteredData ?? [],
    columns,
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const generatedColumns = useTableColumns(table);

  useEffect(() => {
    // Update columns when generatedColumns changes
    setColumns(generatedColumns);
  }, [generatedColumns]);

  useEffect(() => {
    const selectedRowsData = table.getSelectedRowModel().rows.map(row => row.original);
    const validatorIds = selectedRowsData.map(validator => validator.validatorId);
    setSelectedValidatorIds(validatorIds);
  
    // Show the dialog only if two or more validators are selected
    setShowMultiSubscribeDialog(validatorIds.length >= 2);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, table.getSelectedRowModel()]);

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
      {showMultiSubscribeDialog && (
        <MultiSubscribeToMevDialog
          validatorIds={selectedValidatorIds}
        />
      )}
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
