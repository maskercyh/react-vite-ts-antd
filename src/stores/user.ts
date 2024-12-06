import { createSlice } from '@reduxjs/toolkit';
import { setLocalInfo, getLocalInfo, removeLocalInfo } from '@/utils/local';
import { STORAGE_AUTHORIZE_KEY } from '@/composables/authorization'
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    // 用户权限
    permissions: [],
    token: '',
    // 用户信息
    userInfo: {
      id: 0,
      username: '',
      email: '',
      phone: ''
    },
    menuList: [],
  },
  reducers: {
    /** 设置导航*/
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    /** 设置token*/
    setToken: (state, action) => {
      state.token = action.payload;
      setLocalInfo(STORAGE_AUTHORIZE_KEY, action.payload);
    },
    /** 退出登录*/
    logout: (state, action) => {
      removeLocalInfo(STORAGE_AUTHORIZE_KEY);
      state.token = action.payload;
      clearInfo()
    },
    /** 设置用户信息 */
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    /** 设置权限 */
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    /** 清除用户信息 */
    clearInfo: (state) => {
      state.menuList = []
      state.userInfo = {
        id: 0,
        username: '',
        email: '',
        phone: ''
      };
    }
  }
});

export const {
  setUserInfo,
  setPermissions,
  clearInfo,
  logout,
  setMenuList,
  setToken
} = userSlice.actions;

export default userSlice.reducer;