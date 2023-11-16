/* eslint-disable react/button-has-type */
import { Pagination } from './Pagination'
import { TableDataTypes } from '../types'
import { flexRender, type Table as TableType } from '@tanstack/react-table'
import clsx from 'clsx'
import { useState } from 'react'
import { SearchInput } from '@/components/common/SearchInput'
import { FilterGroup } from '@/components/common/FilterGroup'

interface TableProps<T> {
  className?: string
  data: T[]
  hasFilter?: boolean
  filterValue?: string
  filterTitle?: string
  filterOptions?: {
    label: string
    value: string
  }[]
  setFilterValue?: (value: string) => void
  searchInput: string
  setSearchInput: (value: string) => void
  searchPlaceholder?: string
  table: TableType<T>
  title: string
}

export function TableLayout<T extends TableDataTypes>({
  className,
  data,
  hasFilter,
  filterValue,
  filterTitle,
  setFilterValue,
  filterOptions,
  searchInput,
  setSearchInput,
  searchPlaceholder,
  table,
  title,
}: TableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showActionButton, setShowActionButton] = useState(false)

  const handleCheckboxChange = (itemId: string) => {
    // Toggle the selected state for the item
    setSelectedItems((prevSelectedItems) => {
      let updatedSelectedItems

      if (prevSelectedItems.includes(itemId)) {
        // Item is already selected, so unselect it
        updatedSelectedItems = prevSelectedItems.filter((id) => id !== itemId)
      } else {
        // Item is not selected, so select it
        updatedSelectedItems = [...prevSelectedItems, itemId]
      }

      // Show the action button if more than one item is selected
      setShowActionButton(updatedSelectedItems.length > 1)

      return updatedSelectedItems
    })
  }

  const handleActionButtonClick = () => {
    // Perform subscribe or unsubscribe action here based on selectedItems
    console.log('Perform action on selected items:', selectedItems)

    // Reset selected items and hide the action button
    setSelectedItems([])
    setShowActionButton(false)
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      <div className="flex items-center justify-between py-6 px-8">
        <h3 className="text-2xl font-bold leading-8 text-DAppDeep">{title}</h3>
        <div className="flex items-center gap-x-11">
          <div className="max-w-xs">
            <SearchInput
              placeholder={searchPlaceholder}
              value={searchInput}
              onChange={setSearchInput}
            />
          </div>
          {hasFilter && (
            <FilterGroup
              options={filterOptions ?? []}
              setValue={setFilterValue ?? (() => null)}
              title={filterTitle ?? ''}
              value={filterValue ?? ''}
            />
          )}
        </div>
      </div>
      <div className={clsx('overflow-y-hidden overflow-x-scroll', className)}>
        <table className="w-full table-auto">
          <thead className="w-full border-t-[0.5px] border-DAppNeutral/100 bg-DAppNeutral/50 px-[20px]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {/* Add a th for the checkbox column */}
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === data.length &&
                      selectedItems.length > 0
                    }
                    onChange={() => {
                      const allItemsSelected =
                        selectedItems.length === data.length
                      setSelectedItems(
                        allItemsSelected ? [] : data.map((item) => item.id)
                      )
                      setShowActionButton(!allItemsSelected)
                    }}
                  />
                </th>

                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 text-left text-sm font-medium">
                    {header.isPlaceholder ? null : (
                      <p className="w-fit px-6 text-left">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </p>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="border-t-[0.5px] border-DAppNeutral/100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b-[0.5px]">
                {/* Add a td for the checkbox in each row */}
                <td className="px-4">
                  <input
                    checked={selectedItems.includes(row.id)}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-3 px-4 text-sm font-normal text-DAppDeep">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showActionButton && (
        <div className="mr-4 mb-4 flex justify-end">
          <button
            className="rounded border-2 border-DAppBlue bg-white py-1.5 px-3 text-sm font-semibold text-DAppBlue outline-none transition duration-200  hover:opacity-90 active:opacity-80 disabled:opacity-75"
            onClick={handleActionButtonClick}>
            Subscribe/Unsubscribe
          </button>
        </div>
      )}
      <Pagination
        currentPage={table.getState().pagination.pageIndex}
        itemsPerPage={table.getState().pagination.pageSize}
        setCurrentPage={table.setPageIndex}
        totalItems={data.length}
        totalPages={table.getPageCount()}
      />
    </div>
  )
}
