import { Column } from '@tanstack/react-table'
import {
  CaretSortIcon,
  CaretDownIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons'

import { ReactNode } from 'react'
import { Tooltip } from '@/components/common/Tooltip'
import type { Block, Validator } from '../types'

interface HeaderTooltipProps {
  header: string
  tooltip?: string
  column?: Column<Block, number> | Column<Validator, number>
}

export function HeaderTooltip({ header, tooltip, column }: HeaderTooltipProps) {
  const toggleSort = (event: React.MouseEvent | React.KeyboardEvent) => {
    // Check if getToggleSortingHandler exists and then call the returned function with the event
    const toggleHandler = column?.getToggleSortingHandler()
    if (toggleHandler) {
      toggleHandler(event)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Check for the Enter key
    if (event.key === 'Enter') {
      toggleSort(event)
    }
  }

  let sortIndicator: ReactNode = null
  if (column?.getIsSorted()) {
    sortIndicator =
      column.getIsSorted() === 'desc' ? <CaretDownIcon /> : <CaretUpIcon />
  } else if (column?.getCanSort()) {
    sortIndicator = <CaretSortIcon />
  }

  return (
    <span
      className="flex cursor-pointer items-center justify-center"
      role="button"
      tabIndex={0} // Make the element focusable
      onClick={toggleSort}
      onKeyDown={handleKeyDown}>
      <span className="mr-2 flex items-center">
        <span>{header}</span>
        <span className="ml-1">{sortIndicator}</span>
      </span>
      {tooltip && <Tooltip tooltip={tooltip} />}
    </span>
  )
}
