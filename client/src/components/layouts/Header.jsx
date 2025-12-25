import React, { useState } from 'react';
import { Layout, Button, Avatar, Input, Badge, Dropdown, Switch, Tooltip, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  SearchOutlined,
  SunOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  ProfileOutlined
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;

export default function Header({ collapsed, setCollapsed }) {
  // State giả lập cho Dark Mode (Trong thực tế bạn sẽ dùng Context hoặc Redux)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Xử lý khi chọn menu user
  const handleMenuClick = (e) => {
    console.log('Click menu item:', e.key);
    if (e.key === 'logout') {
      // Xử lý đăng xuất ở đây
    }
  };

  // Các item trong dropdown menu user
  const userMenuItems = [
    {
      key: 'profile',
      label: 'Hồ sơ cá nhân',
      icon: <ProfileOutlined />,
    },
    {
      key: 'settings',
      label: 'Cài đặt tài khoản',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      danger: true, // Màu đỏ cảnh báo
    },
  ];

  return (
    <AntHeader
      style={{
        padding: '0 24px',
        background: '#fff', // Nếu làm darkmode thật, chỗ này cần đổi màu động
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        position: 'sticky',
        top: 0,
        zIndex: 999,
      }}
    >
      {/* --- LEFT SIDE: Toggle & Search --- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: 18, width: 40, height: 40 }}
        />
        
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          style={{
            width: 320,
            borderRadius: 20,
            background: '#f5f5f5',
            border: 'none'
          }}
        />
      </div>

      {/* --- RIGHT SIDE: Actions & User --- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        
        {/* 1. Hướng dẫn sử dụng */}
        <Tooltip title="Hướng dẫn sử dụng">
          <Button 
            type="text" 
            icon={<QuestionCircleOutlined style={{ fontSize: 18, color: '#595959' }} />} 
            style={{ width: 40, height: 40 }}
          />
        </Tooltip>

        {/* 2. Dark/Light Mode Switch */}
        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={isDarkMode}
          onChange={(checked) => setIsDarkMode(checked)}
          style={{ background: isDarkMode ? '#177ddc' : '#bfbfbf' }}
        />

        {/* 3. Notification */}
        <Badge count={5} size="small" offset={[-5, 5]}>
          <Button
            type="text"
            icon={<BellOutlined style={{ fontSize: 18, color: '#595959' }} />}
            style={{ width: 40, height: 40 }}
          />
        </Badge>

        {/* 4. User Dropdown */}
        <Dropdown 
            menu={{ 
                items: userMenuItems, 
                onClick: handleMenuClick 
            }} 
            trigger={['click']}
            arrow
            placement="bottomRight"
        >
          <div 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 12, 
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 8,
                transition: 'all 0.3s'
            }}
            className="user-hover-area" // Bạn có thể thêm CSS hover effect nếu muốn
          >
            <Avatar
              size={36}
              icon={<UserOutlined />}
              style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  cursor: 'pointer'
              }}
            />
            <div style={{ lineHeight: 1.2, userSelect: 'none' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#262626' }}>Nguyễn Văn A</div>
              <div style={{ fontSize: 12, color: '#8c8c8c' }}>Admin</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
}