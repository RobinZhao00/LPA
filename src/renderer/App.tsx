import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Spin } from 'antd';
import 'normalize.css';
import './App.css';
import { Home, About, Contact, Trend } from './pages';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ minHeight: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
              // 这里可以添加逻辑来处理路由导航
              if (key === '1') {
                window.location.href = '/'; // 导航到 Home 页面
              }
            }}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <Link to="/">首页</Link>,
              },
              {
                key: '2',
                icon: <RiseOutlined />,
                label: <Link to="/trend">趋势</Link>,
              },
              {
                key: '3',
                icon: <VideoCameraOutlined />,
                label: <Link to="/about">关于</Link>,
              },
              {
                key: '4',
                icon: <UploadOutlined />,
                label: <Link to="/contact">联系我们</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
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
            <Suspense fallback={<Spin size="large" delay={1000} />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/trend" element={<Trend />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
