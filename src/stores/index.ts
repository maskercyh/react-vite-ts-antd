// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/composables/authorization';

// 配置 Redux store
const store = configureStore({
    reducer: {
        auth: authReducer,  // 把 authSlice 加入到 store 中
    },
});

export default store;

// 为了方便在组件中访问 store 状态，可以定义 RootState 类型
export type RootState = ReturnType<typeof store.getState>;

// 为了支持 useDispatch 类型推导，可以定义 AppDispatch 类型
export type AppDispatch = typeof store.dispatch;
