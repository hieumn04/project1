import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import { Calendar, ConfigProvider } from 'antd'
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes/AppRoutes';

function App() {
  const element = useRoutes(routes);

  return (
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#1DA57A",
            },
            components : {
              Notification: {
                  colorPrimary: "#4a7c59",
                  marginXL: 50,
              },
              Calendar: {
                itemAcviveBg: "#e8f5e9",
              },
              Button: {
                colorPrimary: "#4a7c59",
                colorPrimaryHover: "#3a6349",
                colorPrimaryActive: "#2d4d39",
              },


                
            
            }
        }}
    >
      <ScrollToTop/> 
      {element}
    </ConfigProvider>         
  )
}

function WrapperApp() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeRouting: true }}
    >
      <App />
    </BrowserRouter>
  )
}

export default WrapperApp;
