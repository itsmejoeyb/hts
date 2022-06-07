import useSWR from "swr"

//@ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

const useGetWorkOrders = () => {
    const { data, error, mutate } = useSWR(`/api/workorders`, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error,
        setData: mutate
    }
}

export default useGetWorkOrders