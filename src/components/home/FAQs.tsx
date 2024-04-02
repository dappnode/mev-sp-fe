import { Disclosure, Transition } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
    {
        id: 1,
        question: "What do I need to claim my rewards?",
        answer:
            "Once your pending rewards are transformed into accumulated rewards after your block proposal, a claim transaction will be required from the withdrawal address to send the ETH rewards to your wallet.",
    },
    {
        id: 2,
        question: "Does Smooth take my Consensus Layer (CL) rewards?",
        answer:
            "No, Smooth does not take your CL rewards. CL rewards are always sent directly to your withdrawal address. Smooth only takes the execution layer rewards, which are the fees or MEV of the blocks you propose.",
    },
    {
        id: 3,
        question: "If I want to unsubscribe my validator from Smooth, when is the best time to do it?",
        answer: "Unsubscribing a validator from Smooth causes it to lose all its pending rewards. Hence, the ideal moment to exit Smooth is just after your last successful block proposal is reflected in Smooth's Smart Contract. A successful block proposal transfers all pending rewards claimable, allowing you to claim them before unsubscribing. This approach minimizes the pending rewards lost when unsubscribing."
    },
    {
        id: 4,
        question: "Does Smooth take my Consensus Layer (CL) rewards?",
        answer: "No, Smooth does not take your CL rewards. CL rewards are always sent directly to your withdrawal address. Smooth only takes the execution layer rewards, which are the fees or MEV of the blocks you propose. These are the rewards that are sent to the fee recipient."
    }
]

export default function FAQs() {
    return (
        <div className="mx-auto my-16 mt-32 max-w-7xl px-6 sm:py-32 lg:px-8 lg:py-10">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <h2 className="text-3xl font-bold leading-10 tracking-tight text-DAppDeep dark:text-DAppDarkText">Frequently asked questions</h2>
                <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                    {faqs.map((faq) => (
                        <Disclosure key={faq.question} as="div" className="pt-6">
                            {({ open }) => (
                                <>
                                    <dt>
                                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-DAppDeep dark:text-DAppDarkText">
                                            <span className="text-base font-semibold leading-7">{faq.question}</span>
                                            <span className="ml-6 flex h-7 items-center">
                                                {open ? (
                                                    <MinusSmallIcon aria-hidden="true" className="h-6 w-6" />
                                                ) : (
                                                    <PlusSmallIcon aria-hidden="true" className="h-6 w-6" />
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </dt>
                                    <Transition
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 -translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 -translate-y-1"
                                        show={open}
                                    >
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base leading-7 text-DAppDeep dark:text-DAppDarkText">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </Transition>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </dl>
            </div>
        </div>
    );
}
