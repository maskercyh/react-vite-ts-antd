import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/index.css'
import App from './view/index/index'
import 'uno.css';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'; // 兼容低版本浏览器
// import { setupI18n } from './locales'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyleProvider
      hashPriority='high'
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <App />
  </StyleProvider>
  </StrictMode>,
)
