import { Layout } from "antd";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";





const StandardLayout = () => {

    return (
        <Layout >
            
                <Header/>
                <Layout.Content >
                    <Outlet />
                </Layout.Content>
            

        </Layout>
    )
    
}    
export default StandardLayout;