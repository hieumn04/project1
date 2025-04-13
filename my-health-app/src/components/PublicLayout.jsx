import { Layout } from "antd"
import Header from "../components/Header";




const PublicLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header/>
            <Layout.Content style={{ padding: "20px", background: "#fff" }}>
                {children}
            </Layout.Content>

        </Layout> 
    )
};

export default PublicLayout;

