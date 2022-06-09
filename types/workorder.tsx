export interface Workorder {
    id: number;
    title: string;
    details: string;
    initials: string;
    type: string;
    attachments: [
        {
            id: number;
            name: string;
            url: string;
        }
    ];
    tasks: [
        {
            id: number;
            title: string;
            description: string;
            created: string;
            completed: boolean;
        }
    ];
    lastUpdated: string;
    datetime: string;
    pinned: false;
    bgColorClass: string;
    status: string;
    shipping: [
        {
            id: number;
            name: string;
            tracking: string;
        }
    ];
    contact: {
        firstName: string;
        lastName: string;
        fullName: string;
        email: string;
        address: string;
        phone: string;
    };
    notes: [
        {
            id: number;
            name: string;
            date: string;
            imageId: string;
            body: string;
        }
    ]
};