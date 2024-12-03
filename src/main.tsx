import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.css'
import Router from './router';
import 'uno.css';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'; // 兼容低版本浏览器
// import { setupI18n } from './locales'
// 时间设为中文
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider
      hashPriority='high'
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <Router />
  </StyleProvider>
  </StrictMode>
)
