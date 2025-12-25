import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  AreaChartOutlined,
  BookOutlined,
  FieldTimeOutlined,
  FileTextOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  DollarOutlined,
  WalletOutlined,
  LineChartOutlined,
  RiseOutlined,
  HeartOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const mainMenuItems = [
  {
    key: 'dashboard',
    icon: <AreaChartOutlined />,
    label: 'Dashboard',
  },
  {
    key: '1',
    icon: <BookOutlined />,
    label: 'Học tập',
    children: [
      { key: '1-1', icon: <FileTextOutlined />, label: 'Ghi chú kiến thức' },
      { key: '1-2', icon: <CalendarOutlined />, label: 'Lịch học' },
    ],
  },
  {
    key: '2',
    icon: <CheckSquareOutlined />,
    label: 'Công việc',
    children: [
      { key: '2-1', icon: <CheckSquareOutlined />, label: 'Danh sách việc' },
      { key: '2-2', icon: <CalendarOutlined />, label: 'Lịch trình' },
    ],
  },
  {
    key: '3',
    icon: <DollarOutlined />,
    label: 'Tài chính',
    children: [
      { key: '3-1', icon: <WalletOutlined />, label: 'Thu chi' },
      { key: '3-2', icon: <LineChartOutlined />, label: 'Phân tích' },
    ],
  },
  {
    key: '4',
    icon: <FieldTimeOutlined />,
    label: 'Thời gian',
    children: [
      { key: '4-1', icon: <RiseOutlined />, label: 'Theo dõi tiến độ' },
      { key: '4-2', icon: <HeartOutlined />, label: 'Thói quen' },
      { key: '4-3', icon: <CalendarOutlined />, label: 'Pomodoro' },
    ],
  },
  {
    key: '5',
    icon: <BookOutlined />,
    label: 'Hữu ích',
    children: [
      { key: '5-1', icon: <GlobalOutlined />, label: 'Website' },
      { key: '5-2', icon: <HeartOutlined />, label: '?' },
    ],
  },
];

const secondaryMenuItems = [
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Cài đặt',
  },
];

export default function Sidebar({ collapsed }) {
  const [selectedKeys, setSelectedKeys] = useState(['1-1']);
  const [openKeys, setOpenKeys] = useState(['1']);

  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
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

        /* --- PHẦN MỚI THÊM: Highlight cha khi con được chọn ở chế độ Collapsed --- */
        
        /* Khi menu thu nhỏ, tìm item cha đang được chọn (submenu-selected) */
        .ant-menu-inline-collapsed > .ant-menu-submenu-selected > .ant-menu-submenu-title {
            background-color: #1677ff !important; /* Màu xanh Ant Design mặc định, bạn có thể đổi */
            color: #fff !important;
            border-radius: 8px; /* Bo góc nhẹ cho đẹp */
        }

        /* Đảm bảo icon bên trong cũng màu trắng cho nổi */
        .ant-menu-inline-collapsed > .ant-menu-submenu-selected > .ant-menu-submenu-title .anticon {
            color: #fff !important;
        }

        /* Tinh chỉnh hover một chút cho mượt */
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
            inlineCollapsed={collapsed} // QUAN TRỌNG: Fix lỗi click và hiển thị
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
            inlineCollapsed={collapsed} // QUAN TRỌNG
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