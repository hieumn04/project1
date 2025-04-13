import { useEffect } from "react";
import { clearAuthToken, useAuthStore } from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";




const Login = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
   
    
    
    useEffect(() => {
        useAuthStore.getState().checkAuthStatus();
    }, []);

    const handleSubmit = async(values) => {
        try {
            form.setFields([]);
            clearAuthToken();
            const user = await useAuthStore.getState().login(values);
            
            message.success("Login successful!");
            switch (user.role) {
                case "student":
                  navigate("/student-profile");
                  break;
                case "psychologist":
                  navigate("/psychologist-profile");
                  break;
                case "parent":
                  navigate("/parent-profile");
                  break;
                case "manager":
                  navigate("/manager/users");
                  break;
                default:
                  navigate("/");
              }
        } catch(error) {
            console.error("Login error:", error);
            if(error.response?.status === 401) {
                message.error("Invalid email or password");
            }
            else if(error.response?.status === 403) {
                message.error("Session expired. Please try again.");
                useAuthStore.persist.clearStorage();
            }
            else {
                message.error("Login failed. Please try again");
            }
            form.setFieldValue({password: ""});
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Sign in</h2>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    className="login-form"
                    initialValues={{ remember: false }}>
                    <Form.Item
                        label="Email"
                        name="loginIdentifier"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input
                            size="large"
                            placeholder="Enter your Email"
                            prefix={<UserOutlined className="text-gray-400" />}
                            className="login-input"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Enter your password"
                            prefix={<LockOutlined className="text-gray-400" />}
                            className="login-input"
                        />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox className="remember-checkbox">Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={useAuthStore.getState().isLoading}
                            size="large"
                            className="login-button"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
            </Form>
            <div className="forgot-password">
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            </div>
        </div>

    )
}
export default Login;