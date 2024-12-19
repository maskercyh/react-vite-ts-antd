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
export function toRoute(menu: MenuType[], parentPath: string = ''): RouteObject[] {
  return menu.reduce<RouteObject[]>((resRoute, item) => {
    const path = parentPath === "/" ? item.path : `${parentPath}/${item.path.replace(/^\/+/, '')}`;
    if (!item.children) {
      const obj = {
        path,
        key: item.key,
        label: item.label,
        element: LazyLoad(item.element),
      };
      resRoute.push(obj);
    } else {
      const childRoutes = toRoute(item.children, path);
      resRoute.push(...childRoutes);
    }

    return resRoute;
  }, []);
}


/**
 * 生成icon menu
 * @param menu 菜单列表
 */
export function toMenu(menu: MenuType[], parentPath: string = ''): MenuItem[] {
  return menu.map((item) => {
    const { key, label, icon } = item;
    const path = `${parentPath.replace(/\/$/, '')}/${item.path.replace(/^\/+/, '')}`;
    const newItem: MenuItem = {
      label,
      key,
      path,
      icon: icon && iconList[item.icon] ? React.createElement(iconList[item.icon]) : null,
    };
    if (item.children) {
      newItem.children = toMenu(item.children, path);
    }
    return newItem;
  });
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
