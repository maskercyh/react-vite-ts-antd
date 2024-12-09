import { createSlice } from '@reduxjs/toolkit';
import { setLocalInfo, getLocalInfo, removeLocalInfo } from '@/utils/local';
import { STORAGE_AUTHORIZE_KEY } from '@/composables/authorization';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogout } from "@/api/user";

// 初始化状态
const initialState = {
  permissions: [],
  token: '',
  userInfo: {
    id: 0,
    username: '',
    email: '',
    phone: ''
  },
  menuList: [],
};

// 创建切片
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      setLocalInfo(STORAGE_AUTHORIZE_KEY, action.payload);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    clearInfo: (state) => {
      state.menuList = [],
        state.userInfo = {
          id: 0,
          username: '',
          email: '',
          phone: ''
        };
    },
  },
});

// 异步的登出操作
export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    try {
      await userLogout(); // 调用 API
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // 移除本地存储的授权信息
      removeLocalInfo(STORAGE_AUTHORIZE_KEY);
      // 清除用户信息
      dispatch(userSlice.actions.clearInfo());
    }
  }
);

export const {
  setUserInfo,
  setPermissions,
  clearInfo,
  setMenuList,
  setToken,
} = userSlice.actions;

export default userSlice.reducer;
