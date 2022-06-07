import { projects } from "dummy-data/data";
import useSWR from "swr"

//@ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

const useGetWorkOrder = (id: number) => {
    const { data, error, mutate } = useSWR(`/api/workorders/${id}`, fetcher)

    return {
        workOrder: data,
        isLoading: !error && !data,
        isError: error,
        setWorkOrder: mutate
    }
}

export default useGetWorkOrder