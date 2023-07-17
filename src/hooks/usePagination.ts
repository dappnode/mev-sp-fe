import { Dispatch, SetStateAction, useMemo } from 'react'

export const DOTS = '...'

interface UsePaginationProps {
  totalPageCount: number
  siblingCount?: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export function usePagination({
  totalPageCount,
  siblingCount = 1,
  currentPage,
  setCurrentPage,
}: UsePaginationProps) {
  const handleSetPage = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page - 1)
    }
  }

  const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
  }

  const paginationRange = useMemo(() => {
    const totalPageNumbers = 6

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    const shouldShowLeftDots = leftSiblingIndex > 3
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex)
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
  }, [totalPageCount, siblingCount, currentPage])

  return { paginationRange, handleSetPage }
}
