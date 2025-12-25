// components/layouts/ClientLayout.jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = Layout;

export default function ClientLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      
      <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'all 0.2s' }}>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <Content
          style={{
            margin: 10,
            padding: 10,
            minHeight: 280,
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 1px 2px rgba(0,0,0,.03), 0 1px 6px -1px rgba(0,0,0,.02), 0 2px 4px rgba(0,0,0,.02)',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
