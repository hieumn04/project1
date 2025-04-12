import { useEffect, useMemo } from "react";

import {Dropdown, ConfigProvider, Button, Menu } from "antd";
import {UserOutlined, CalendarFilled} from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { filterDropdownItemsByRole, filterMenuItemsByRole } from "../utils/Helper";
import { menuItems } from "../constant/menuItems";
import { useAuthStore } from "../stores/authStore";

const Header = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();   
    const logout = useAuthStore((state) => state.logout); 
    const location = useLocation();


  const handleMenuClick = (e) => {
    switch(e.key) {
        case "logout":
            logout();
            break;
        case "dashboard":
            navigate(`${user?.role}`);
            break;
        default:
            navigate(e.key);
            break;
    }
  };

  
    const handleDropdownButton = () => {
        if(user?.role === "student") {
            navigate("/student-profile")
        } else if(user?.role === "psychologist") {
            navigate("psychologist-profile")
        } else if(user?.role === "parent") {
            navigate("parent-profile")
        }
    } 

    const menuProps = {
        items: filterDropdownItemsByRole(menuItems, user?.role),
        onclick: handleMenuClick,
    }

    const checkAuthUI = () => {
        !user ? (
            <div className="flex gap-5">
                <Link to="/register" className="btn btn-outline">
                    Sign Up
                </Link>
                <Link to="/login" className="btn btn-primary">
                    Sign In
                </Link>
            </div>
        ) : (
            <Dropdown.Button
                menu={menuProps}
                align="end"
                buttonsRender={([,rightButton]) => [
                    <Button
                        key={user?.role}
                        icon={<UserOutlined />}
                        onClick={handleDropdownButton}
                        className={`flex items-center gap-2 px-3 py-1 rounded-l-md border${
                            user?.role === "manager" && `w-full pointer-events-none`
                          }`}        
                    
                    >
                        {user.fullname}
                    </Button>,rightButton
                ]}
                trigger={"click"}         
                
            />

            
        )
    }

    const navItems = useMemo(() => {
        const filteredItems = filterMenuItemsByRole(menuItems, user?.role)
            .filter((item) => !item.special);

        const specialItem = filterMenuItemsByRole(menuItems, user?.role)
            .find((item) => item.special);
            
        return {
            filteredItems,
            specialItem,
        }    


    }, [user?.role]);

  

  return (
    <>
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-icon">🧠</span>
                        <span className="logo-text">Mental Health Support</span>
                    </Link>
                </div>
            
                <nav className="">
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={navItems.filteredItems}
                        style={{
                            flex:1,
                            minWidth: 0,
                            justifyContent: "end",
                            borderBottom: 0,
                        }}
                    />
                    {navItems.specialItem && (
                        <>
                            <Button
                                type="primary"
                                className="rounded-full"
                                onClick={() => navigate(navItems.specialItem.key)}
                            >
                                <p className="text-white w-full">
                                    {navItems.specialItem.label}
                                </p>

                            </Button>
                        </>
                    )}
                    <div className="nav-actions" id="authButtons">
                        {checkAuthUI()}
                    </div>
                </nav>
            </div>
        </header>
    </>
  );
}   

export default Header;