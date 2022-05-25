import { projects } from "../dummy-data/data"
import { useState } from 'react'

const useGetWorkOrders = () => {
    const [workOrders, setWorkOrders] = useState(projects)

    const handleUpdatePinned = (id: number) => {
        setWorkOrders((prevWorkOrders) =>
            prevWorkOrders.map((workOrder) => {
                return workOrder.id === id ? { ...workOrder, pinned: !workOrder.pinned } : workOrder;
            }),
        )
    }


    return {workOrders, handleUpdatePinned}
}

export default useGetWorkOrders