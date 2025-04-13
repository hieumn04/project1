import { Layout } from "antd";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";





const StandardLayout = () => {

    return (
        <Layout>
            <div>
                <Header/>
                <div>
                    <Outlet/>
                </div>
            </div>

        </Layout>
    )
    
}    
export default StandardLayout;