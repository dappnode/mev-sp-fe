import { SummaryCard, SummaryCardProps } from '..'
import { formatTime } from '@/utils/formatTime'

interface LastCheckpointCardProps
  extends Pick<SummaryCardProps, 'isError' | 'isLoading'> {
  lastCheckpoint: number | undefined
  nextCheckpoint: number | undefined
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
