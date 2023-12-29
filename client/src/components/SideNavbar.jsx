import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate
const { Header, Content, Footer, Sider } = Layout;

const items = [
  { icon: <UserOutlined />, label: 'nav 1', path: '/register' },
  { icon: <VideoCameraOutlined />, label: 'nav 2', path: '/login' },
  { icon: <UploadOutlined />, label: 'nav 3', path: '/page3' },
  { icon: <UserOutlined />, label: 'nav 4', path: '/page4' },
];

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Use the useNavigate hook
  const navigate = useNavigate();

  // Function to handle navigation
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <Sider
        breakpoint="sm"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="light" mode="inline">
          {items.map(({ icon, label, path }) => (
            <Menu.Item key={path} icon={icon} onClick={() => navigateTo(path)}>
              {label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ height: '0px' }} />
        <Content style={{ margin: '5px 10px 0' }}>
          <div style={{ padding: 24 }}>{/* content */}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
