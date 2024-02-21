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
        <div className="flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 text-center sm:pr-3.5 lg:pl-8">
            <p className="text-sm leading-6 text-white ">
                <span>
                    Change your Fee Recipient to&nbsp;
                    <code className="font-mono font-semibold text-gray-300">
                        {feeRecipientAddress}
                    </code>
                    &nbsp;before subscribing to Smooth!
                </span>
                <button
                    aria-label="Copy address to clipboard"
                    className="ml-2 p-1 focus-visible:outline-offset-[-2px]"
                    type="button"
                    onClick={handleCopyClick}
                >
                    <ClipboardIcon aria-hidden="true" className="h-4 w-4 text-gray-300" />
                </button>
            </p>
            {copySuccess && (
                <div className="fixed bottom-6 right-6">
                    <Transition
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0"
                        enterTo="translate-y-0 opacity-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        show={copySuccess}
                    >
                        <div className="w-64 max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="shrink-0">
                                        <ClipboardIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">Address copied to clipboard!</p>
                                    </div>
                                    <div className="ml-4 flex shrink-0">
                                        <button
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            type="button"
                                            onClick={handleCloseClick}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            )}
        </div>
    );
}
