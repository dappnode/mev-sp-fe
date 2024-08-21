import { DialogProps } from '../types';
import Link from 'next/link';
import { type BaseError, useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import { StepProgressBar } from '@/components/common/StepProgressBar';
import { Button } from '@/components/common/Button';
import contractInterface from '@/contract/abi.json';
import { SMOOTHING_POOL_ADDRESS, UNSUB_FEEDBACK_SCRIPT_URL, SELECTED_CHAIN } from '@/utils/config';
import { useEffect } from 'react';

interface UnsubscribeDialogProps extends DialogProps {
  validatorId: number;
  setShowCloseButton: (show: boolean) => void;
  selectedOptions: string[];
  otherOption: string;
  otherOptionSelected: boolean;
  improvementsFeedback: string;
}

export function UnsubscribeDialog({
  steps,
  validatorId,
  setShowCloseButton,
  handleChangeDialogState,
  handleClose,
  selectedOptions,
  otherOptionSelected,
  otherOption,
  improvementsFeedback,
}: UnsubscribeDialogProps) {
  const { address, chain } = useAccount();
  const queryClient = useQueryClient();

  const postFeedbackData = async () => {
    const formData = new FormData();
    formData.append('network', SELECTED_CHAIN);
    formData.append('validator-id', validatorId.toString());
    formData.append('why-options', selectedOptions.join('\n'));
    formData.append('other-options', otherOptionSelected ? otherOption : '');
    formData.append('improvements', improvementsFeedback);
    formData.append('timestamp', new Date().toISOString());

    if (UNSUB_FEEDBACK_SCRIPT_URL) {
      await fetch(UNSUB_FEEDBACK_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });
    }
  };

  const abi = [...contractInterface] as const;
  const { writeContractAsync: write, data: hash, isPending, isSuccess: isTxSuccess, isError: isWriteError, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isReceiptSuccess, isError: isReceiptError } = useWaitForTransactionReceipt({ hash });

  useEffect(() => setShowCloseButton(false), [isTxSuccess]);

  useEffect(() => {
    if (isReceiptSuccess) {
      handleChangeDialogState('success');
      postFeedbackData();
      queryClient.invalidateQueries({ queryKey: ['validators', address] });
    }
  }, [isReceiptSuccess]);

  const unsubValidator = async () => {
    try {
      await write({
        abi,
        address: SMOOTHING_POOL_ADDRESS,
        functionName: 'unsubscribeValidator',
        args: [validatorId],
      });
    } catch (err) {
      console.error('Error unsubscribing validator:', err);
    }
  };

  return (
    <>
      <div className="-mt-2 text-DAppDeep dark:text-DAppDarkText">
        <h3 className="mb-6 text-left text-2xl font-bold">Unsubscribe</h3>
        <StepProgressBar currentStep={2} steps={steps} />
      </div>

      {!isPending && !isConfirming && !isWriteError && !isReceiptError && (
        <div className="mt-6 text-DAppDeep dark:text-DAppDarkText">
          <p className="text-lg text-center">Are you sure you want to unsubscribe validator {validatorId}?</p>
        </div>
      )}

      {isPending && (
        <div className=" flex-1 flex mt-6 text-DAppDeep dark:text-DAppDarkText">
          <div className="mx-auto mb-2 flex w-fit flex-col items-center sm:flex-row animate-pulse">
            <AiOutlineInfoCircle />
            <p className="ml-2 mt-1 sm:mt-0">Awaiting wallet confirmation.</p>
          </div>
        </div>
      )}

      {isConfirming && (
        <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-8 text-sm font-normal dark:bg-DAppDarkSurface-300 dark:text-DAppDarkText">
          <div className="mx-auto mb-2 flex w-fit flex-col items-center sm:flex-row animate-pulse">
            <AiOutlineInfoCircle />
            <p className="ml-2 mt-1 sm:mt-0">Your unsubscription is being processed.</p>
          </div>
          <div className="mx-auto mt-2 max-w-fit">
            <Link
              className="text-violet-500 underline dark:text-violet-200"
              href={`${chain?.blockExplorers?.default.url}/tx/${hash}`}
              target="_blank"
            >
              Check the transaction on block explorer
            </Link>
          </div>
        </div>
      )}

      {isWriteError && (
        <div className="mt-6 w-full rounded-lg bg-violet-50 px-4 py-4 text-sm font-normal dark:bg-DAppDarkSurface-300 dark:text-DAppDarkText">
          <div className="mx-auto mb-2 flex w-fit flex-col items-center">
            <p>An error occurred while sending the transaction. Please try again.</p>
            {writeError && <div>Error: {(writeError as BaseError).shortMessage || writeError.message}</div>}
          </div>
        </div>
      )}

      {isReceiptError && (
        <div className="mt-6 text-DAppDeep dark:text-DAppDarkText">
          <p className="text-lg text-left">An error occurred while confirming the transaction. Please try again.</p>
          {writeError && <div>Error: {(writeError as BaseError).shortMessage || writeError.message}</div>}
        </div>
      )}

      {!isPending && !isConfirming && (
        <div className="mt-6 text-DAppDeep dark:text-DAppDarkText">
          <div className="mt-6">
            <Button onClick={unsubValidator} isDisabled={isPending || isConfirming}>
              {isReceiptError ? 'Try again' : 'Unsubscribe'}
            </Button>
            <Button buttonType="secondary" className="mt-4" onPress={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {isReceiptSuccess && (
        <div className="mt-6 text-DAppDeep dark:text-DAppDarkText">
          <p className="text-lg text-left">Your unsubscription has been processed.</p>
        </div>
      )}
    </>
  );
}
