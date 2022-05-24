import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { projects } from '../../dummy-data/data'
import {
    CheckIcon,
    PaperClipIcon,
    ThumbUpIcon,
    UserIcon,
} from '@heroicons/react/solid'
import { title } from 'process'

const attachments = [
    { name: 'install_info.pdf', href: '#' },
    { name: 'other_install_info.pdf', href: '#' },
]

const comments = [
    {
        id: 1,
        name: 'Jane Smith',
        date: '4d ago',
        imageId: '1494790108377-be9c29b29330',
        body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
    },
    {
        id: 2,
        name: 'John Smith',
        date: '4d ago',
        imageId: '1506794778202-cad84cf45f1d',
        body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
    },
    {
        id: 3,
        name: 'Jane Smith',
        date: '4d ago',
        imageId: '1494790108377-be9c29b29330',
        body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
    },
]

const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
    {
        id: 1,
        type: eventTypes.applied,
        content: 'Applied to',
        target: 'Front End Developer',
        date: 'Sep 20',
        datetime: '2020-09-20',
    },
    {
        id: 2,
        type: eventTypes.advanced,
        content: 'Advanced to phone screening by',
        target: 'Bethany Blake',
        date: 'Sep 22',
        datetime: '2020-09-22',
    },
    {
        id: 3,
        type: eventTypes.completed,
        content: 'Completed phone screening with',
        target: 'Martha Gardner',
        date: 'Sep 28',
        datetime: '2020-09-28',
    },
    {
        id: 4,
        type: eventTypes.advanced,
        content: 'Advanced to interview by',
        target: 'Bethany Blake',
        date: 'Sep 30',
        datetime: '2020-09-30',
    },
    {
        id: 5,
        type: eventTypes.completed,
        content: 'Completed interview with',
        target: 'Katherine Snyder',
        date: 'Oct 4',
        datetime: '2020-10-04',
    },
]

const statusStyles = {
    ontime: 'bg-green-100 text-green-800',
    delayed: 'bg-yellow-100 text-yellow-800',
}

const user = {
    name: 'Jane Smith',
    email: 'whitney@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}

//@ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const workOrder = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    //@ts-ignore
    const project = projects.filter(project => project.id === +router.query.slug)
    const [workOrder, setWorkOrder] = useState(project[0])
    const [tasks, setTasks] = useState(project[0].tasks)

    return (
        <div className='pt-8'>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{workOrder.title}</h1>
                <p className="text-sm font-medium text-gray-500">
                  Created on <time dateTime={workOrder.datetime}>{workOrder.lastUpdated}</time>
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-cyan-500"
              >
                Mark complete
              </button>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                      Contact Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Contact details and order information.</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 text-sm text-gray-900">John Smith</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900">johnsmith@example.com</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1 text-sm text-gray-900">123 First St.</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="mt-1 text-sm text-gray-900">555-555-5555</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Shipment status</dt>
                            <dd className={classNames(
                            //@ts-ignore
                            statusStyles[workOrder.shipping], "mt-1 text-sm w-[fit-content] rounded-full px-2 py-1")}>{workOrder.shipping}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Details</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                          Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                          proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                            {attachments.map((attachment) => (
                              <li
                                key={attachment.name}
                                className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                              >
                                <div className="w-0 flex-1 flex items-center">
                                  <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                  <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a href={attachment.href} className="font-medium text-cyan-600 hover:text-cyan-500">
                                    View
                                  </a>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                        Notes
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        {comments.map((comment) => (
                          <li key={comment.id}>
                            <div className="flex space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-sm">
                                  <a href="#" className="font-medium text-gray-900">
                                    {comment.name}
                                  </a>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>{comment.body}</p>
                                </div>
                                <div className="mt-2 text-sm space-x-2">
                                  <span className="text-gray-500 font-medium">{comment.date}</span>{' '}
                                  <span className="text-gray-500 font-medium">&middot;</span>{' '}
                                  <button type="button" className="text-gray-900 font-medium">
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-6 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <form action="#">
                          <div>
                            <label htmlFor="comment" className="sr-only">
                              About
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              rows={3}
                              className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Add a note"
                              defaultValue={''}
                            />
                          </div>
                          <div className="mt-3 flex items-center">
                            <button
                              type="submit"
                              className="ml-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                              Comment
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                  Tasks
                </h2>

                {/* Activity Feed */}
                <div className="mt-6 flow-root">
                    <fieldset>
                        <legend className="text-lg font-medium text-gray-900"></legend>
                        <div className=" border-t border-b border-gray-200 divide-y divide-gray-200">
                            {tasks.map((task, personIdx) => (
                                <div key={personIdx} className="relative flex items-start py-4">
                                    <div id='title' className={classNames(task.completed ? "line-through" : "","min-w-0 flex-1 text-sm ")}>
                                        <label htmlFor={`task-${task.id}`} className="font-medium text-gray-700 select-none">
                                            {task.title}
                                        </label>
                                        <p className='text-gray-500'>{task.description}</p>
                                    </div>
                                    <div className="ml-3 flex items-center h-5">
                                        <input
                                            id={`task-${task.id}`}
                                            name={`task-${task.id}`}
                                            type="checkbox"
                                            defaultChecked={task.completed}
                                            className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300 rounded"
                                            onChange={(e) => {
                                                task.completed = e.target.checked
                                                setTasks([...tasks]);
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                </div>
                {/* <div className="mt-6 flex flex-col justify-stretch">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Advance to offer
                  </button>
                </div> */}
              </div>
            </section>
          </div>
        </div>
    );
}

export default workOrder;