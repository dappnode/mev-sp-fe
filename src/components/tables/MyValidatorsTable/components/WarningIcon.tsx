export type Warnings = 'none' | 'yellow' | 'red' | 'banned'

interface WarningIconProps {
  warning: Warnings
}

export function WarningIcon({ warning }: WarningIconProps) {
  if (warning === 'none') {
    return <div className="pl-1">-</div>
  }
  return (
    <div className="flex w-fit items-center justify-center">
      {warning === 'banned' ? (
        <div>💀</div>
      ) : (
        <div
          className={`h-4 w-4 rounded-full border-2 border-DAppNeutral-50 ${
            warning === 'yellow' ? 'bg-DAppOrange-800' : 'bg-DAppRed'
          }`}
        />
      )}
    </div>
  )
}
