import React from 'react'
import LazyLoad from '@/utils/LazyLoad'
import type { RouteObject } from 'react-router-dom'
import * as Icons from '@ant-design/icons'
import { MenuType, RouteType, MenuItem } from "#/menu"
const iconList: any = Icons

/**
 * 扁平化菜单
 * @param menu 菜单列表
 * @returns 扁平化菜单
 */
export function flattenTreeByMenu(menu: MenuType[]): RouteType[] {
  let flatArray: RouteType[] = []
  menu.forEach((node) => {
    const { id, path, children } = node
    flatArray.push({ key: id.toString(), path, })
    if (children) {
      flatArray = flatArray.concat(flattenTreeByMenu(children))
    }
  })
  return flatArray
}

/**
 * 添加路由配置
 * @param menu 菜单列表（树）
 * @returns 动态路由
 */
export function toRoute(menu: MenuType[], parentPath: string = '/'): RouteObject[] {
  let resRoute: RouteObject[] = []
  menu.forEach((item) => {
    // const obj = {
    //   path: item.path,
    //   key: item.key,
    //   label: item.label,
    //   element: LazyLoad(item.element),
    //   children: item.children ? toRoute(item.children) : []
    // }
    // resRoute.push(obj)
    const path = parentPath === "/" ? '/' + item.path : parentPath + '/' + item.path

    if (!item.children) {
      const obj = {
        path: path,
        key: item.key,
        label: item.label,
        element: LazyLoad(item.element),
      }
      resRoute.push(obj)
    } else {
      resRoute = resRoute.concat(toRoute(item.children, path))
    }
  })
  return resRoute
}


/**
 * 生成icon menu
 * @param menu 菜单列表
 */
export function toMenu(menu: MenuType[]): MenuItem[] {
  const temp: MenuItem[] = []
  menu.forEach((item) => {
    const { key, label, icon, path } = item
    const newItem: MenuItem = {
      label,
      key,
      path,
      icon: icon ? React.createElement(iconList[item.icon]) : ''
    }
    if (item.children) {
      newItem.children = toMenu(item.children)
    }
    temp.push(newItem)
  })

  return temp
}

export function findParentMenuKey(menu: MenuType[], path: string): string[] {
  const result: string[] = []
  function dfs(menuItem: MenuType) {
    if (path.startsWith(menuItem.path)) {
      result.push(menuItem.key.toString())
    }

    if (menuItem.children) {
      menuItem.children.forEach((child) => {
        dfs(child)
      })
    }
  }

  menu.forEach((menuItem) => {
    dfs(menuItem)
  })

  return result
}
