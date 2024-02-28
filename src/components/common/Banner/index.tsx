/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { ClipboardIcon, XMarkIcon } from '@heroicons/react/20/solid'

export default function Banner() {
    const [copySuccess, setCopySuccess] = useState(false);

    // Address to be copied
    const feeRecipientAddress = '0xAdFb8D27671F14f297eE94135e266aAFf8752e35';

    // Function to handle the click event on the close button
    const handleCloseClick = () => {
        // Set the copy success state to false to hide the notification
        setCopySuccess(false);
    };

    // Function to handle click event on the copy icon button
    const handleCopyClick = () => {
        // Copy the address to the clipboard
        navigator.clipboard.writeText(feeRecipientAddress)
            .then(() => {
                // Set copy success state to true
                setCopySuccess(true);
                // Hide the success message after 3 seconds
                setTimeout(() => {
                    setCopySuccess(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
    };

    return (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
            <div
                aria-hidden="true"
                className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            >
                <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            >
                <div
                    className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath:
                            'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                    }}
                />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-sm leading-6 text-gray-900">
                    Change your Fee Recipient to <strong className="font-semibold">0xAdFb8D27671F14f297eE94135e266aAFf8752e35 </strong> before subscribing to Smooth!
                </p>
            </div>
            <div className="flex flex-1 justify-end">
                <button className="-m-3 p-3 focus-visible:outline-offset-[-4px]" type="button">
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-900" />
                </button>
            </div>
        </div>
    );
}