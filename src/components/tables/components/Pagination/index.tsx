import { v4 as uuidv4 } from 'uuid'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { usePagination } from '@/hooks/usePagination'

interface PaginationProps {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const isFirstPage = currentPage === 0
  const isLastPage = currentPage === totalPages - 1
  const hamdultiplePages = totalPages > 1

  const { paginationRange, handleSetPage } = usePagination({
    currentPage: currentPage + 1,
    totalPageCount: totalPages,
    setCurrentPage,
  })

  return (
    <div className="flex h-[80px] w-full flex-col items-center justify-between bg-white px-4 py-3 md:h-[60px] md:flex-row md:px-8">
      <p className="mr-2 text-center text-sm font-normal text-DAppNeutral/500 md:text-left ">
        Showing {Math.min(itemsPerPage, totalItems)} of {totalItems} Results
      </p>
      <div className="flex items-center gap-x-[1px] px-1 text-sm text-DAppDeep md:gap-x-[2px]">
        {hamdultiplePages && (
          <button
            className={isFirstPage ? 'text-DAppNeutral/500' : ''}
            disabled={isFirstPage}
            type="button"
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
                'bg-DAppLight text-DAppBlue hover:bg-DAppLight',
              typeof page === 'number'
                ? 'cursor-pointer hover:bg-DAppLight/80'
                : 'cursor-default'
            )}
            onClick={() => handleSetPage(page)}>
            {page}
          </button>
        ))}
        {hamdultiplePages && (
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
