import { Tooltip } from '@/components/common/Tooltip'

interface HeaderTooltipProps {
  header: string
  tooltip?: string
}

export function HeaderTooltip({ header, tooltip }: HeaderTooltipProps) {
  if (!tooltip) {
    return <span>{header}</span>
  }

  return (
    <span className="flex items-center justify-center">
      <span className="mr-2">{header}</span>
      <Tooltip tooltip={tooltip} />
    </span>
  )
}
