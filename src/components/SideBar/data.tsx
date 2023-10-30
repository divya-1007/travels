import { DashboardOutlined, EditOutlined, FormOutlined, LogoutOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons"

export interface ChildrenData {
    id: number
    icon?: any
    title: string
    path?: string
    disable?: boolean
}

interface IData {
    id: number
    icon: any
    title: string
    path?: string
    children?: ChildrenData[]
    disable?: boolean
    label?: any
    role?: any
}

const data: IData[] = [
    {
        id: 0,
        icon: <DashboardOutlined />,
        title: 'Dashboard',
        path: '/dashboard',
        disable: true,
        role: ["ADMIN"]
    },
    {
        id: 0,
        icon: <DashboardOutlined />,
        title: 'Dashboard',
        path: '/company/dashboard',
        disable: true,
        role: ["COMPANY"]
    },
    {
        id: 1,
        icon: <UserOutlined />,
        title: 'Profile',
        path: '/profile',
        disable: false,
        role: ["ADMIN", "COMPANY"]
    },
    {
        id: 22,
        icon: <FormOutlined />,
        title: 'Cab Booking List',
        path: '/cabbooking-list',
        disable: true,
        role: ["ADMIN", "COMPANY"]
    },

    {
        id: 10,
        icon: <UnorderedListOutlined />,
        title: 'Company',
        path: '/company',
        disable: true,
        role: ["ADMIN"],
        children: [{
            id: 11,
            icon: <UnorderedListOutlined />,
            title: 'Company List',
            path: '/Company/company-list',
            disable: false,
        },
        {
            id: 12,
            icon: <EditOutlined />,
            title: 'Company Register',
            path: '/company-register',
            disable: false,
        },


        ]
    },
    {
        id: 13,
        icon: <UnorderedListOutlined />,
        title: 'Employee',
        path: '/employee',
        disable: true,
        role: ["ADMIN", "COMPANY"],
        children: [{
            id: 14,
            icon: <UnorderedListOutlined />,
            title: 'Employee List',
            path: '/employee/employee-list',
            disable: false,
        },
        {
            id: 15,
            icon: <EditOutlined />,
            title: 'Employee Register',
            path: '/employee-register',
            disable: false,
        },
        ]
    },
    {
        id: 16,
        icon: <UnorderedListOutlined />,
        title: 'Driver',
        path: '/Driver',
        disable: true,
        role: ["ADMIN"],
        children: [{
            id: 17,
            icon: <UnorderedListOutlined />,
            title: 'Driver List',
            path: '/driver/driver-list',
            disable: false,
        },
        {
            id: 18,
            icon: <EditOutlined />,
            title: 'Driver Register',
            path: '/driver-register',
            disable: false,
        },


        ]
    },
    {
        id: 19,
        icon: <UnorderedListOutlined />,
        title: 'Cab',
        path: '/cab',
        disable: true,
        role: ["ADMIN"],
        children: [{
            id: 20,
            icon: <UnorderedListOutlined />,
            title: 'Cab List',
            path: '/cab/cab-list',
            disable: false,
        },
        {
            id: 21,
            icon: <EditOutlined />,
            title: 'Cab Register',
            path: '/cab-register',
            disable: false,
        },
        {
            id: 22,
            icon: <FormOutlined />,
            title: 'Cab Type ',
            path: '/cab-type',
            disable: true,
        },


        ]
    },
    {
        id: 5,
        icon: <FormOutlined />,
        title: 'Report ',
        path: '/report',
        disable: true,
        role: ["ADMIN", "COMPANY"],
    },

    {
        id: 6,
        icon: <LogoutOutlined />,
        title: 'Logout',
        path: '',
        disable: true,
        role: ["ADMIN", "COMPANY"],

    },

]

export default data
