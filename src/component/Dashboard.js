import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DiffOutlined
} from '@ant-design/icons';
import logo from '../assets/favicon/favicon-76x76.png';
import { Button, Layout, Menu, theme } from 'antd';
import UploadComponent from './UploadComponent';
import TableContent from './TableContent';
import UserProfileDetail from './UserProfileDetail';
import Verfication from './Verification';

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1'); // State to track selected menu
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key); // Update the selected menu item
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return (<UserProfileDetail/>);
      case '2':
        return (<Verfication/>);
      case '3':
        return (<TableContent/>);
      case '4':
          return (<UploadComponent/>);
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img src={logo} alt='logo-dash'/>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]} // Highlight the selected menu item
          onClick={handleMenuClick} // Handle menu item clicks
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'Profile',
            },
            {
              key: '2',
              icon: <DiffOutlined />,
              label: 'Verification',
            },
            {
              key: '3',
              icon: <VideoCameraOutlined />,
              label: 'Device List',
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'Upload File',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()} {/* Render content based on selected menu */}
        </Content>
      </Layout>
    </Layout>
  );
}
