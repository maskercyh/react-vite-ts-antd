export const STORAGE_AUTHORIZE_KEY = 'Authorization'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem(STORAGE_AUTHORIZE_KEY) || null,  // 从 localStorage 获取 token
};

// 创建 authSlice，处理 token 相关的状态和 action
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.token = action.payload;
            localStorage.setItem(STORAGE_AUTHORIZE_KEY, action.payload); // 保存 token 到 localStorage
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem(STORAGE_AUTHORIZE_KEY); // 清除 localStorage 中的 token
        },
    },
});

// 导出 actions 和 reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

