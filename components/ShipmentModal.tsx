/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    shipping: any[],
    setShipping: (shipping: any) => void
}

const ShipmentModal = ({open, setOpen, setShipping, shipping}: Props) => {
    const [name, setName] = useState('')
    const [tracking, setTracking] = useState('')

    const nameRef = useRef(null)

    const handleAddShipment = () => {
        //@ts-ignore
        setShipping([...shipping, { id: shipping.length + 1, name, tracking }])
        setOpen(false)
        setName('')
        setTracking('')
    }


    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={nameRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            id="name"
                                            className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Enter name"
                                        />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="tracking" className="block text-sm font-medium text-gray-700">
                                        Tracking number
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="tracking"
                                            value={tracking}
                                            onChange={e => setTracking(e.target.value)}
                                            id="tracking"
                                            className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Enter tracking number"
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:col-start-2 sm:text-sm"
                                        onClick={handleAddShipment}
                                    >
                                        Add shipment
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ShipmentModal