import { Layout } from "antd";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";





const StandardLayout = () => {

    return (
        <Layout>
            
                <Header/>
                <Layout.Content style={{ padding: "20px", background: "#fff" }}>
                    <Outlet />
                </Layout.Content>
            

        </Layout>
    )
    
}    
export default StandardLayout;