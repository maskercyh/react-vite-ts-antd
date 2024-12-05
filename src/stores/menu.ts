import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  isPhone: boolean;
  isCollapsed: boolean;
  selectedKeys: string;
  openKeys: string[];
  menuList: any[]; // 假设 `SideMenu` 类型定义
}

const initialState: MenuState = {
  isPhone: false,
  isCollapsed: false,
  selectedKeys: 'dashboard',
  openKeys: ['Dashboard'],
  menuList: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
    togglePhone: (state, action: PayloadAction<boolean>) => {
      state.isPhone = action.payload;
    },
    setSelectedKeys: (state, action: PayloadAction<string>) => {
      state.selectedKeys = action.payload;
    },
    setOpenKeys: (state, action: PayloadAction<string[]>) => {
      state.openKeys = action.payload;
    },
    setMenuList: (state, action: PayloadAction<any[]>) => {
      state.menuList = action.payload;
    },
  },
});

export const { toggleCollapsed, togglePhone, setSelectedKeys, setOpenKeys, setMenuList } = menuSlice.actions;

export default menuSlice.reducer;
