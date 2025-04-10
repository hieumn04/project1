import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WrapperApp from './App'
import { ConfigProvider } from 'antd'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
      <WrapperApp />
    </ConfigProvider>
  </StrictMode>,
)
