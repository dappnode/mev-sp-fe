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
  showEmptyMessage?: boolean;
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
  showEmptyMessage,
}: TableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white bg-opacity-80 dark:bg-DAppDarkSurface/200 dark:bg-opacity-80">
      <div className="flex items-center justify-between px-8 py-6">
        <h3 className="text-2xl font-bold leading-8 text-DAppDeep dark:text-DAppDarkText">
          {title}
        </h3>
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
      <div className={clsx('overflow-x-scroll', className)}>
        <table className="w-full table-auto">
          {/* Table headers */}
          <thead className="w-full border-t-[0.5px] border-DAppNeutral/100 bg-DAppNeutral/50 px-[20px] dark:border-DAppDarkSurface/300 dark:bg-DAppDarkSurface/300">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-4 text-left text-sm font-medium">
                    {header.isPlaceholder ? null : (
                      <p className="w-fit px-4 text-left">
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
          {/* Table body */}
          <tbody className="border-t-[0.5px] border-DAppNeutral/100 dark:border-DAppDarkSurface/300">
               {data.length === 0 && showEmptyMessage ? ( // Only show if data is empty and showEmptyMessage is true
              <tr>
                <td
                  className="p-6 text-center"
                  colSpan={table.getHeaderGroups()[0].headers.length}
                >
                  <div className="rounded-md bg-yellow-50 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Heads Up!
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            Don&apos;t see any validators? Make sure you
                            connect with your Withdrawal Address to see
                            your validators listed here.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              // Render table rows if data is available
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b-[0.5px] dark:border-DAppDarkSurface/300">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm font-normal text-DAppDeep dark:text-DAppDarkText">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={table.getState().pagination.pageIndex}
        itemsPerPage={table.getState().pagination.pageSize}
        setCurrentPage={table.setPageIndex}
        setPageSize={table.setPageSize}
        totalItems={data.length}
        totalPages={table.getPageCount()}
      />
    </div>
  );
}

