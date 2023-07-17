import { SummaryCard, SummaryCardProps } from '..'
import { BsFillPersonFill } from 'react-icons/bs'

interface TotalSubscribersCardProps
  extends Pick<SummaryCardProps, 'isError' | 'isLoading'> {
  subscribers: number | undefined
}

export function TotalSubscribersCard({
  isError,
  isLoading,
  subscribers,
}: TotalSubscribersCardProps) {
  return (
    <SummaryCard
      isError={isError}
      isLoading={isLoading}
      title="Total Subscribers">
      <div className="flex items-center text-DAppDeep">
        <BsFillPersonFill className="mr-2 h-[28px] w-[24px]" />
        <h4 className="text-2xl font-bold leading-8">{subscribers}</h4>
      </div>
    </SummaryCard>
  )
}
