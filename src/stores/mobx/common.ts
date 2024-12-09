import { computed, makeAutoObservable } from 'mobx'
import type { RouteObject } from 'react-router-dom'

class CommonStore {
  count = 0
  menu: [] = []
  routes: RouteObject[] = []
  constructor() {
    makeAutoObservable(this, {
      countAddOne: computed
    })
  }
  increment() {
    this.count++
  }

  get countAddOne() {
    return this.count + 1
  }
  setMune(list: []) {
    this.menu = list
  }
  setRoutes(list: RouteObject[]) {
    this.routes = list
  }
}

// 创建实例化对象
const commonStore = new CommonStore()

export default commonStore
