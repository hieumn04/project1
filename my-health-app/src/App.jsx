
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
              Menu: {
                horizontalItemSelectedColor: "#4a7c59",
                horizontalItemHoverColor: "#4a7c59",
                itemHoverColor: "#4a7c59",
                itemSelectedColor: "#4a7c59",
                itemHoverBg: "rgba(74, 124, 89, 0.1)",
                itemSelectedBg: "rgba(74, 124, 89, 0.1)",
                activeBarBorderWidth: 2,
                activeBarHeight: 2,
                horizontalItemBorderRadius: 0,
                activeBarColor: "#4a7c59",
                subMenuItemBg: "#ffffff",
                itemActiveBg: "rgba(74, 124, 89, 0.1)",
                horizontalLineHeight: "46px",
                itemMarginInline: 0,
                itemBorderRadius: 0,
                popupBg: "#ffffff",
                subMenuItemColor: "#4a7c59",
                groupTitleColor: "#4a7c59",
                horizontalLineType: "solid",
                activeBarWidth: 2,
                subMenuTitleColor: "#4a7c59",
                
              }


                
            
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
