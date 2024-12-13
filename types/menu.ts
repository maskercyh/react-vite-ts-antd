//菜单
export interface MenuType {
    id: number
    label: string
    key: string,
    path: string
    hidden: boolean

    icon: string
    element: string
    children?: MenuType[]
}
export interface MenuItem {
    key: string
    label: string
    path: string

    icon: React.ReactNode
    children?: MenuItem[]
}

//路由
export interface RouteType {
    key: string
    path: string
    label: string
}

