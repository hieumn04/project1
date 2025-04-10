import { useEffect } from "react";


import {Dropdown, Menu, ConfigProvider, Button } from "antd";

const Header = () => {
  const handleMenuClick = (e) => {
    console.log("Clicked menu item:", e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <h1>My Health App</h1>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button>Profile</Button>
      </Dropdown>
    </div>
  );
}   

export default Header;