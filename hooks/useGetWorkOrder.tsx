import { projects } from "dummy-data/data";
import { useState } from "react";
import { Workorder } from "types/workorder";

const useGetWorkOrder = (id: string) => {
    
    const project = projects.filter(project => project.id === +id)[0]
    const [workOrder, setWorkOrder] = useState(project)

    return { workOrder }
}

export default useGetWorkOrder;