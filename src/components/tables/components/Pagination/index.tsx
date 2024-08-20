/* eslint-disable jsx-a11y/control-has-associated-label */
import { v4 as uuidv4 } from 'uuid'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { usePagination } from '@/hooks/usePagination'

interface PaginationProps {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export function Pagination({
  currentPage,
  setCurrentPage,
  setPageSize,
  totalPages,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const isFirstPage = currentPage === 0
  const isLastPage = currentPage === totalPages - 1
  const hasMultiplePages = totalPages > 1

  const { paginationRange, handleSetPage } = usePagination({
    currentPage: currentPage + 1,
    totalPageCount: totalPages,
    setCurrentPage,
  })

  let pageSizeOptions: number[] = []

  pageSizeOptions.push(totalItems < itemsPerPage ? totalItems : itemsPerPage)
  for (let index = 1; index < totalItems / 10; index += 1) {
    pageSizeOptions.push(index * 10)
  }
  pageSizeOptions.push(totalItems)

  pageSizeOptions = Array.from(new Set(pageSizeOptions)).sort((a, b) => a - b)

  return (
    <div className="flex h-[80px] w-full flex-col items-center justify-between bg-white px-4 py-3 dark:bg-DAppDarkSurface/300 md:h-[60px] md:flex-row md:px-3">
      <div className="flex flex-row gap-2 items-center text-sm">
        <p>Showing</p>
        <select
          className="p-1 rounded-md dark:bg-DAppDarkSurface/400 hover:bg-DAppLight/80 dark:hover:bg-DAppDarkSurface/500 bg-DAppLight focus:outline-none"
          value={itemsPerPage}
          onChange={(e) => setPageSize(Number(e.target.value))}>
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p>of {totalItems} Results</p>
      </div>
      <div className="flex items-center gap-x-[1px] px-1 text-sm text-DAppDeep dark:text-DAppDarkText md:gap-x-[2px]">
        {hasMultiplePages && (
          <button
            disabled={isFirstPage}
            type="button"
            className={
              isFirstPage ? 'text-DAppNeutral/500 dark:text-DAppDarkText' : ''
            }
            onClick={() => setCurrentPage(currentPage - 1)}>
            <IoIosArrowBack />
          </button>
        )}
        {paginationRange?.map((page) => (
          <button
            key={uuidv4()}
            disabled={typeof page === 'string'}
            type="button"
            className={clsx(
              'rounded p-2 md:px-3',
              currentPage === Number(page) - 1 &&
                'bg-DAppLight text-DAppBlue hover:bg-DAppLight dark:bg-DAppDarkSurface/400',
              typeof page === 'number'
                ? 'cursor-pointer hover:bg-DAppLight/80 dark:hover:bg-DAppDarkSurface/500'
                : 'cursor-default'
            )}
            onClick={() => handleSetPage(page)}>
            {page}
          </button>
        ))}
        {hasMultiplePages && (
          <button
            className={isLastPage ? 'text-DAppNeutral/500' : ''}
            disabled={isLastPage}
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}>
            <IoIosArrowForward />
          </button>
        )}
      </div>
    </div>
  )
}
