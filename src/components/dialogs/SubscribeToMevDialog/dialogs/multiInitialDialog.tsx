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

  const notRegisteredValidatorKeys: string[] = [];
  const notCorrectlyRegisteredValidatorKeys: string[] = [];
  const checkFieldsForAllValidators = () => {
    if (registeredRelaysQuery.isSuccess && registeredRelaysQuery.data) {
      registeredRelaysQuery.data.forEach((validatorData, index) => {
        // process all data here and get out the fields I need
        const notRegisteredtoAnyRelay = validatorData.correctFeeRelayers === null && validatorData.wrongFeeRelayers === null;
        const registeredButNoCorrectRelays = validatorData.correctFeeRelayers === null && validatorData.wrongFeeRelayers !== null;

        if (notRegisteredtoAnyRelay) {
          notRegisteredValidatorKeys.push(validatorKeys[index]);
        } 
        else if (registeredButNoCorrectRelays) {
          notCorrectlyRegisteredValidatorKeys.push(validatorKeys[index]);
        }
        console.log(`Validator ${index + 1} registered relays data:`);
        console.log('Correct Fee Recipients:', validatorData.correctFeeRecipients);
        console.log('Correct Fee Relayers:', validatorData.correctFeeRelayers);
        console.log('Wrong Fee Relayers:', validatorData.wrongFeeRelayers);
        console.log('Unregistered Relayers:', validatorData.unregisteredRelayers);
        // You can perform any specific checks or operations here for each validator's data
      });
    }
  };
  checkFieldsForAllValidators();
  return (
    <>
      <Toaster />
      <div className="-mt-2 text-DAppDeep">
        <h3 className="mb-6 text-left text-2xl font-bold">
          Fee Recipient Check
        </h3>
        <StepProgressBar currentStep={0} steps={steps} />
      </div>
      <div className="sm:px-6">
        <div>
          <h4 className="mb-2 text-DAppNeutral/500">Your Validators</h4>
          <p className="h-8">{validatorKeys}</p>
        </div>
      </div>
      {notRegisteredValidatorKeys.length > 0 ? (
        <div>
          <h4 className="mb-2 text-DAppNeutral/500">Not Registered</h4>
          <p className="h-8">{notRegisteredValidatorKeys}</p>
        </div>
      ) : notCorrectlyRegisteredValidatorKeys.length > 0 ? (
        <div>
          <h4 className="mb-2 text-DAppNeutral/500">Not Correctly Registered</h4>
          <p className="h-8">{notCorrectlyRegisteredValidatorKeys}</p>
        </div>
      ) : (
        <div>
          <h4 className="mb-2 text-DAppNeutral/500">All Validators OKAY!</h4>
        </div>
      )}
    </>
  )
}