import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { user, projects } from '../../dummy-data/data'
import type { NextPage } from "next"
import {
    PaperClipIcon,
} from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/outline'
import useGetWorkOrder from '@hooks/useGetWorkOrder'
import { Workorder } from '../../types/workorder'
import { formJson } from '../../dummy-data/data'
import FormElement from '@components/FormElement'

const attachments = [
    { name: 'install_info.pdf', href: '#' },
    { name: 'other_install_info.pdf', href: '#' },
]

//@ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

//@ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

interface Props {
  projects: [
    {
      id: number,
      title: string,
      details: string,
      initials: string,
      type: string,
      tasks: [{
        id: number,
        title: string,
        description: string,
        created: string,
        completed: boolean,
      }],
      lastUpdated: string,
      datetime: string,
      pinned: false,
      bgColorClass: string,
      status: string,
      shipping: string,
      contact: {
        firstName: string,
        lastName: string,
        fullName: string,
        email: string,
        address: string,
        phone: string,
      },
      notes: [
        {
          id: number,
          name: string,
          date: string,
          imageId: string,
          body: string,
        }
      ]
    }
  ],
  user: {
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    imageUrl: string
  }
};

const WorkOrder: NextPage<Props> = (props) => {
    const router = useRouter()
    //@ts-ignore
    const id = +router.query.slug
    // const project = props.projects.filter(project => project.id === id)[0]

    
    const { workOrder, isError, isLoading, setWorkOrder } = useGetWorkOrder(id)

    // const [workOrder, setWorkOrder] = useState<Workorder>(project)
    const [tasks, setTasks] = useState<any[]>([])
    const [images, setImages] = useState<any[]>([])
    const [imageUrls, setImageUrls] = useState<string[]>([])

    useEffect(() => {
      if (workOrder) {
        setTasks(workOrder.tasks)
      }
    }, [workOrder])

    useEffect(() => {
      if (images.length < 1) return;
      const newImageUrls: string[] = []
      images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
      setImageUrls(newImageUrls)
    },[images])

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //@ts-ignore
    setImages([...images, ...e.target.files])
  }

  const addTask = () => {
    //@ts-ignore
    setTasks([...tasks, {id: tasks.length + 1, title: '', description: '', created: '', completed: false}])
  }

  const removeTask = (id: number) => {
    let items = [...tasks];
    items.splice(items.findIndex(item => item.id === id), 1)
    //@ts-ignore
    setTasks(items);
  }

  if(isError) return <p>Error</p>
  if(isLoading) return <p>Loading...</p>

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

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description*/}
              <section aria-labelledby="workorder-information">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 id="workorder-information" className="text-lg leading-6 font-medium text-gray-900">
                      Contact Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Contact details and order information.</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <form>
                      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        {formJson.json.map( field => <FormElement key={field.name} field={field}/> )}

                      </div>
                    </form>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1 mt-4">
                        <dt className="text-sm font-medium text-gray-500">Shipment status</dt>
                          <dd className="mt-1 text-sm w-[fit-content] rounded-full px-2 py-1 text-cyan-600 hover:text-cyan-500">
                            <a href="#">{workOrder.shipping || 'No shipping info available.'}</a>
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
              {/* End Description */}

              {/* Tasks */}
            <section aria-labelledby="tasks-title">
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                  Tasks
                </h2>
                <div className="mt-6 flow-root">
                  <fieldset>
                    {/* <legend className="text-lg font-medium text-gray-900"></legend> */}
                    <div className=" border-t border-b border-gray-200 divide-y divide-gray-200">
                      {tasks.map((task: any) => (
                        <div key={task.id} className="relative flex items-start py-4">
                          <div id='title' className={classNames(task.completed ? "line-through" : "", "min-w-0 flex-1 text-sm ")}>
                            {/* <label htmlFor={`task-${task.id}`} className={classNames(task.completed ? "text-gray-300" : "text-gray-700","font-medium select-none")}>
                              {task.title}
                            </label> */}
                            <input 
                              type="text" 
                              name={`task-${task.id}`} 
                              defaultValue={task.description} 
                              className={classNames(task.completed ? "text-gray-300" : "",'shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md')} 
                            />
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
                          <div className="ml-3 flex items-center h-5">
                            <button
                              onClick={() => removeTask(task.id)}
                            >
                              <TrashIcon className='h-6 w-6 text-red-600'/>
                              </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      className="ml-auto mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={addTask}
                    >
                      Add task
                    </button>
                  </fieldset>
                </div>
              </div>
            </section>

            {/* End Tasks */}
              
          </div>
          {/* Sidebar */}
          <section aria-labelledby="photos-title" className="xl:col-start-3 xl:col-span-1">
            <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                    Photos
                  </h2>
                </div>
                <div className="px-4 py-6 sm:px-6">
                  <ul role="list" className="space-y-8">
                    {imageUrls.length > 0 ? imageUrls.map((imageSrc) => (
                      <li key={imageSrc}>
                        <img src={imageSrc} className="w-full h" />
                      </li>
                    )) : 
                    <label htmlFor="images">
                      <span
                        className="relative cursor-pointer block w-full border-2 border-gray-400 border-dashed rounded-lg p-12 text-center hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      >
                        <svg
                          className="mx-auto h-14 w-14 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="mt-2 block text-sm font-medium text-gray-600">Add photos</span>
                        <input type="file" multiple accept='image/*' name="images" className="hidden" onChange={onImageChange} />
                      </span>
                    </label> }
                  </ul>
                </div>
              </div>
              {imageUrls.length > 0 && <div className="bg-gray-50 px-4 py-6 sm:px-6">
                <div className="flex space-x-3">
                  <div className="min-w-0 flex-1">
                    <label className="text-sm font-medium leading-5 text-gray-900">
                      <span className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                        Add photos
                      </span>
                      <input name="images" type="file" multiple accept="image/*" onChange={onImageChange} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>}
            </div>
            <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden mt-4">
              <div className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                    Notes
                  </h2>
                </div>
                <div className="px-4 py-6 sm:px-6">
                  <ul role="list" className="space-y-8">
                    {workOrder.notes.map((note: any) => (
                      <li key={note.id}>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={`https://images.unsplash.com/photo-${note.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                              alt=""
                            />
                          </div>
                          <div>
                            <div className="text-sm">
                              <a href="#" className="font-medium text-gray-900">
                                {note.name}
                              </a>
                            </div>
                            <div className="mt-1 text-sm text-gray-700">
                              <p>{note.body}</p>
                            </div>
                            <div className="mt-2 text-sm space-x-2">
                              <span className="text-gray-500 font-medium">{note.date}</span>{' '}
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
                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                          className="shadow-sm block w-full focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm border border-gray-300 rounded-md"
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
          {/* End Sidebar */}
        </div>
      </div>
    );
}

export async function getServerSideProps() {
  return {
    props: { 
      // projects, 
      user 
    },
  }
}

export default WorkOrder;