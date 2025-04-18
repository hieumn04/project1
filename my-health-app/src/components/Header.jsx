import { useMemo } from "react";
import { Dropdown, Button, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { filterDropdownItemsByRole, filterMenuItemsByRole } from "../utils/Helper";
import { menuItems } from "../constant/menuItems";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      logout();
      navigate("/");
    } else if (key === "dashboard") {
      navigate(`/${user?.role}`);
    } else {
      navigate(key);
    }
  };

  const handleProfileClick = () => {
    switch (user?.role) {
      case "student":
        navigate("/student-profile");
        break;
      case "psychologist":
        navigate("/psychologist-profile");
        break;
      case "parent":
        navigate("/parent-profile");
        break;
      default:
        break;
    }
  };

  const menuProps = {
    items: filterDropdownItemsByRole(menuItems, user?.role),
    onClick: handleMenuClick,
  };

  const navItems = useMemo(() => {
    const filteredItems = filterMenuItemsByRole(menuItems, user?.role).filter(
      (item) => !item.special
    );
    const specialItem = filterMenuItemsByRole(menuItems, user?.role).find(
      (item) => item.special
    );

    return { filteredItems, specialItem };
  }, [user?.role]);

  const renderAuthButtons = () => {
    if (!user) {
      return (
        <div className="flex gap-3 items-center">
          <Link to="/login">
            <Button
              className="custom-button"
              type="default"
              size="middle"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button
              className="custom-button"
              type="primary"
              size="middle"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <Dropdown.Button
        menu={menuProps}
        placement="bottomRight"
        trigger={["click"]}
        buttonsRender={([leftButton, rightButton]) => [
          <Button
            key="user"
            onClick={handleProfileClick}
            
          >
            <Avatar
              size="small"
              style={{ backgroundColor: "#52c41a" }}
              icon={<UserOutlined />}
            />
            <span className="font-medium text-sm">{user?.fullname}</span>
          </Button>,
          rightButton,
        ]}
      />
    );
  };

  return (
    <header className="  w-full">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🧠</span>
          <span className="text-xl sm:text-2xl font-bold text-green-700">
            Mental Health Support
          </span>
        </Link>

        {/* Auth Buttons / Dropdown */}
        <div className="hidden sm:flex">{renderAuthButtons()}</div>
      </div>

      {/* Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center pb-3 flex-wrap">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={navItems.filteredItems}
          className="flex-1 border-none"
        />
        {navItems.specialItem && (
          <Button
            type="primary"
            className="rounded-full mt-2 sm:mt-0 ml-0 sm:ml-4"
            onClick={() => navigate(navItems.specialItem.key)}
          >
            <span className="text-white font-semibold">{navItems.specialItem.label}</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
