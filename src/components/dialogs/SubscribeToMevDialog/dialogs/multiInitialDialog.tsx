import { DialogProps } from '../types'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import CopyToClipboard from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast'
import { FaCopy } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
import { StepProgressBar } from '@/components/common/StepProgressBar'
import { Button } from '@/components/common/Button'
import {
  fetchConfig,
  fetchMultiValidatorRegisteredRelays,
} from '@/client/api/queryFunctions'
import { shortenEthAddress } from '@/utils/web3'

interface MultiInitialDialogProps extends DialogProps {
  validatorKeys: `0x${string}`[]
}

export function MultiInitialDialog({
  steps,
  handleChangeDialogState,
  handleClose,
  validatorKeys,
}: MultiInitialDialogProps) {
  const configQuery = useQuery({
    queryKey: ['config'],
    queryFn: fetchConfig,
  })

  const registeredRelaysQuery = useQuery({
    queryKey: ['registered-relays'],
    queryFn: () => fetchMultiValidatorRegisteredRelays(validatorKeys), // Use the new function here
  });

}