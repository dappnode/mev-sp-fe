import { Pagination } from './Pagination'
import { TableDataTypes } from '../types'
import { flexRender, type Table as TableType } from '@tanstack/react-table'
import clsx from 'clsx'
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
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white">
      <div className="flex items-center justify-between px-8 py-6">
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
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 text-left text-sm font-medium">
                    {header.isPlaceholder ? null : (
                      <p className="w-fit pl-6 pr-2 text-left">
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
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-7 py-3 text-sm font-normal text-DAppDeep">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
