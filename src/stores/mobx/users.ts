import { computed, makeAutoObservable } from 'mobx'

class UsersStore {
  userInfoMobx = {}
  constructor() {
    makeAutoObservable(this, {
      userInfo: computed
    })
  }

  logout() {
    return new Promise((resolve) => {
      resolve(0)
    })
  }

  get userInfo() {
    return this.userInfoMobx
  }
}

// 创建实例化对象
const usersStore = new UsersStore()

export default usersStore
