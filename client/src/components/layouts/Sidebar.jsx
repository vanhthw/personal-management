import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { routes, secondaryRoutes, getMenuItems } from '../../app/routes';

const { Sider } = Layout;

// Chuyển routes thành menu items
const mainMenuItems = getMenuItems(routes);
const secondaryMenuItems = getMenuItems(secondaryRoutes);

// Helper: Tìm route theo key (dùng để lấy path khi click)
function findRouteByKey(key, routeList) {
  for (const route of routeList) {
    if (route.key === key) return route;
    if (route.children) {
      const found = findRouteByKey(key, route.children);
      if (found) return found;
    }
  }
  return null;
}

// Helper: Tìm key và openKeys dựa trên current path
function findKeysByPath(pathname, routeList, parentKey = null) {
  for (const route of routeList) {
    if (route.path === pathname) {
      return {
        selectedKey: route.key,
        openKey: parentKey,
      };
    }
    if (route.children) {
      const result = findKeysByPath(pathname, route.children, route.key);
      if (result.selectedKey) return result;
    }
  }
  return { selectedKey: null, openKey: null };
}

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Tự động detect selected key và open key dựa trên URL hiện tại
  const { selectedKey, openKey } = findKeysByPath(location.pathname, [...routes, ...secondaryRoutes]);

  const [selectedKeys, setSelectedKeys] = useState(selectedKey ? [selectedKey] : ['dashboard']);
  const [openKeys, setOpenKeys] = useState(openKey ? [openKey] : []);

  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);

    // Tìm route tương ứng và navigate
    const route = findRouteByKey(key, routes) || findRouteByKey(key, secondaryRoutes);
    if (route?.path) {
      navigate(route.path); // Dùng navigate thay vì window.location.href
    }
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <>
      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          display: none;
        }
        .sidebar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .ant-layout-sider-children {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .ant-menu-inline-collapsed {
            width: 100%;
        }

        /* --- Highlight cha khi con được chọn ở chế độ Collapsed --- */
        .ant-menu-inline-collapsed > .ant-menu-submenu-selected > .ant-menu-submenu-title {
            background-color: #1677ff !important;
            color: #fff !important;
            border-radius: 8px;
        }

        .ant-menu-inline-collapsed > .ant-menu-submenu-selected > .ant-menu-submenu-title .anticon {
            color: #fff !important;
        }

        .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title:hover {
            color: #fff !important;
        }
      `}</style>

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        collapsedWidth={80}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#001529',
          zIndex: 100,
        }}
      >
        {/* 1. Logo */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0' : '0 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0,
            transition: 'all 0.2s',
          }}
        >
          {collapsed ? (
            <div
              style={{
                width: 32,
                height: 32,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              PM
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                PM
              </div>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 600, whiteSpace: 'nowrap' }}>
                vanhthuww
              </span>
            </div>
          )}
        </div>

        {/* 2. Nav chính */}
        <div
          className="sidebar-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onClick={handleMenuClick}
            onOpenChange={handleOpenChange}
            items={mainMenuItems}
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
            }}
          />
        </div>

        {/* 3. Nav phụ */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            flexShrink: 0,
            paddingBottom: 16
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            inlineCollapsed={collapsed}
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            items={secondaryMenuItems}
            selectable={false}
            style={{
              border: 'none',
              background: 'transparent',  
            }}
          />
        </div>
      </Sider>
    </>
  );
}
