import { SummaryCard, SummaryCardProps } from '..'

interface LastCheckpointCardProps
  extends Pick<SummaryCardProps, 'isError' | 'isLoading'> {
  lastCheckpoint: number | undefined
  nextCheckpoint: number | undefined
}

const formatTime = (seconds: number | undefined): string => {
  if (!seconds) return '0'

  const days = Math.floor(seconds / 86400)
  const remainingSeconds = seconds % 86400

  const date = new Date(0)
  date.setUTCSeconds(remainingSeconds)

  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')

  return `${
    days ? `${days.toString().padStart(2, '0')}d ` : ''
  }${hours}h ${minutes}m`
}

export function LastCheckpointCard({
  lastCheckpoint,
  nextCheckpoint,
  isError,
  isLoading,
}: LastCheckpointCardProps) {
  return (
    <SummaryCard
      bottomLeftText={`Next checkpoint: ${formatTime(nextCheckpoint)}`}
      isError={isError}
      isLoading={isLoading}
      title="Last Checkpoint"
      tooltip="Time since last onchain update">
      <h4 className="text-base font-normal leading-7 text-DAppDeep ">
        {formatTime(lastCheckpoint)}
      </h4>
    </SummaryCard>
  )
}
