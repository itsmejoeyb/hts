import type { NextPage } from 'next'
import {Fragment, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon, CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { IdentificationIcon, ClipboardIcon, ClipboardCheckIcon } from '@heroicons/react/outline'
import { projects, user } from '../dummy-data/data'
import Link from 'next/link'

type Project = {
  id: number,
  title: string,
  initials: string,
  team: string,
  totalTasks: number,
  lastUpdated: string,
  pinned: boolean,
  bgColorClass: string
}

const cards = [
  { name: 'Open Work Orders', href: '#', icon: ClipboardIcon, amount: 12 },
  { name: 'Closed Work Orders', href: '#', icon: ClipboardCheckIcon, amount: 7 },
]

const statusStyles = {
  ontime: 'bg-green-100 text-green-800',
  due: 'bg-yellow-100 text-yellow-800',
  overdue: 'bg-red-100 text-red-800',
}

//@ts-ignore
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Home: NextPage = () => {
  const [workOrders, setWorkOrders] = useState(projects)

  const handleUpdateWorkOrders = (id: number) => {
    setWorkOrders((prevWorkOrders) =>
      prevWorkOrders.map((workOrder) => {
        return workOrder.id === id ? { ...workOrder, pinned: !workOrder.pinned } : workOrder;
      }),
    );
  };

  return (
    <div >
      <div className="bg-white shadow w-full">
        <div className="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0">
              {/* Profile */}
              <div className="flex items-center">
                <img
                  className="hidden h-16 w-16 rounded-full sm:block"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                  alt=""
                />
                <div>
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full sm:hidden"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                      alt=""
                    />
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      Welcome back, {user.fullName}
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                    <dt className="sr-only">Position</dt>
                    <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                      <IdentificationIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {user.title}
                    </dd>
                    {/* <dt className="sr-only">Account status</dt>
                    <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                      <CheckCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      Verified account
                    </dd> */}
                  </dl>
                </div>
              </div>
            </div>
            {/* <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Add Work Order
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {cards.map((card) => (
              <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{card.amount}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href={card.href} className="font-medium text-cyan-700 hover:text-cyan-900">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Work Orders</h2>
        <ul role="list" className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
          {workOrders.filter((workOrder) => workOrder.pinned).map((workOrder) => (
            <li key={workOrder.id} className="relative col-span-1 flex shadow-sm rounded-md">
              <div
                className={classNames(
                  workOrder.bgColorClass,
                  'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                )}
              >
                {workOrder.initials}
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-4 py-2 text-sm truncate">
                  <Link href={`/workorders/${workOrder.id}`}>
                    <a className="text-gray-900 font-medium hover:text-gray-600">
                      {workOrder.title}
                    </a>
                  </Link>
                  <p className="text-gray-500">{workOrder.tasks.length} Tasks</p>
                </div>
                <Menu as="div" className="flex-shrink-0 pr-2">
                  <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={`/workorders/${workOrder.id}`}>
                            <a
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              View
                            </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => handleUpdateWorkOrders(workOrder.id)}
                            >
                              Removed from pinned
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
        Work orders
      </h2>

      {/* Activity list (smallest breakpoint only) */}
      <div className="shadow sm:hidden">
        <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
          {workOrders.map((workOrder) => (
            <li key={workOrder.id}>
              <Link href={`/workorders/${workOrder.id}`} >
                <a className="block px-4 py-4 bg-white hover:bg-gray-50">
                  <span className="flex items-center space-x-4">
                    <span className="flex-1 flex space-x-2 truncate">
                      <ClipboardIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="flex flex-col text-gray-500 text-sm truncate">
                        <span className="truncate">{workOrder.title}</span>
                        <span className="text-gray-900 font-medium">{workOrder.tasks.length}</span>
                        <time dateTime={workOrder.datetime}>{workOrder.lastUpdated}</time>
                      </span>
                    </span>
                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
          aria-label="Pagination"
        >
          <div className="flex-1 flex justify-between">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
            >
              Next
            </a>
          </div>
        </nav>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Work Order
                    </th>
                    <th
                      className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Tasks
                    </th>
                    <th
                      className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block"
                      scope="col"
                    >
                      Status
                    </th>
                    <th
                      className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      scope="col"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workOrders.map((workOrder) => (
                    <tr key={workOrder.id} className="bg-white">
                      <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <Link href={`/workorders/${workOrder.id}`}>
                            <a  className="group inline-flex space-x-2 truncate text-sm">
                              <ClipboardIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              {workOrder.title}
                            </p>
                          </a>
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <span className="text-gray-900 font-medium">{workOrder.tasks.length} </span>
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span
                          className={classNames(
                            //@ts-ignore
                            statusStyles[workOrder.status],
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                          )}
                        >
                          {workOrder.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <time dateTime={workOrder.datetime}>{workOrder.lastUpdated}</time>
                      </td>
                      <td className='relative'>
                        <div>
                          <Menu as="div" className="flex-shrink-0 pr-2">
                            <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                              <span className="sr-only">Open options</span>
                              <DotsVerticalIcon className="w-5 h-5" aria-hidden="true" />
                            </Menu.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <span className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'text-sm cursor-pointer flex'
                                      )}>
                                        <Link href={`/workorders/${workOrder.id}`}>
                                          <a className='w-full h-full px-4 py-2'>
                                            View
                                          </a>
                                        </Link>
                                      </span>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <span
                                        className={classNames(
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                          'block px-4 py-2 text-sm cursor-pointer'
                                        )}
                                        onClick={() => handleUpdateWorkOrders(workOrder.id)}
                                      >
                                        {workOrder.pinned ? 'Remove from pinned' : 'Add to pinned'}
                                      </span>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
