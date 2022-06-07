import type { NextApiRequest, NextApiResponse } from 'next'
import { projects } from '../../../dummy-data/data'

type Data =
    {
        id: number,
        title: string,
        details: string,
        initials: string,
        type: string,
        tasks: {
            id: number,
            title: string,
            description: string,
            created: string,
            completed: boolean,
        }[],
        lastUpdated: string,
        datetime: string,
        pinned: boolean,
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
        notes:
        {
            id: number,
            name: string,
            date: string,
            imageId: string,
            body: string,
        }[],
    }

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query
    const project = projects.find(p => p.id === Number(id))
    //@ts-ignore
    res.status(200).json(project)
}