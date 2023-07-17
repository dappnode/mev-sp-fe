import * as Dialog from '@radix-ui/react-dialog'
import { IoClose } from 'react-icons/io5'
import { Button } from '@/components/common/Button'

interface BaseDialogProps {
  showCloseButton?: boolean
  disabledTrigger?: boolean
  triggerText: string
  children: React.ReactNode
  title?: string
  subtitle?: string
  open?: boolean
  triggerButtonProp?: 'regular' | 'outline'
  handleOpenChange: (open: boolean) => void
}

export function BaseDialog({
  showCloseButton = true,
  children,
  subtitle,
  title,
  disabledTrigger,
  triggerText,
  open,
  triggerButtonProp = 'regular',
  handleOpenChange,
}: BaseDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        {triggerButtonProp === 'regular' ? (
          <Button isDisabled={disabledTrigger}>{triggerText}</Button>
        ) : (
          <Button
            buttonType="secondary"
            color="blue"
            isDisabled={disabledTrigger}
            size="sm">
            {triggerText}
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full w-full bg-gray-600 opacity-30" />
        <Dialog.Content className="fixed top-[50%] left-[50%] w-[500px] max-w-[95%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 md:max-w-[85%]">
          <div className="flex w-full justify-between">
            <h4 className="text-lg font-normal text-DAppDeep">{subtitle}</h4>
            {showCloseButton && (
              <Dialog.Close asChild>
                <button
                  aria-label="Close"
                  className="focus:outline-none"
                  type="button">
                  <IoClose className="h-6 w-6 text-DAppDeep" />
                </button>
              </Dialog.Close>
            )}
          </div>
          <Dialog.Title className="mt-8 text-2xl font-bold leading-8 text-DAppDeep">
            {title}
          </Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
