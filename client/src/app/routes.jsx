// src/app/routes.jsx
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

import * as pages from '../pages/index';

/**
 * Cấu trúc route:
 * - key: unique key cho menu item
 * - path: đường dẫn URL (nếu có)
 * - label: tên hiển thị trên menu
 * - icon: icon component
 * - element: React component để render (nếu có)
 * - children: các route con (nếu có)
 */
export const routes = [
  {
    key: 'dashboard',
    path: '/',
    icon: <AreaChartOutlined />,
    label: 'Dashboard',
    element: null, // Thêm Dashboard component sau
  },
  {
    key: 'learning',
    icon: <BookOutlined />,
    label: 'Học tập',
    children: [
      {
        key: 'learning-notes',
        path: '/learning/notes',
        icon: <FileTextOutlined />,
        label: 'Ghi chú kiến thức',
        element: null,
      },
      {
        key: 'learning-schedule',
        path: '/learning/schedule',
        icon: <CalendarOutlined />,
        label: 'Lịch học',
        element: null,
      },
    ],
  },
  {
    key: 'work',
    icon: <CheckSquareOutlined />,
    label: 'Công việc',
    children: [
      {
        key: 'work-tasks',
        path: '/work/tasks',
        icon: <CheckSquareOutlined />,
        label: 'Danh sách việc',
        element: null,
      },
      {
        key: 'work-schedule',
        path: '/work/schedule',
        icon: <CalendarOutlined />,
        label: 'Lịch trình',
        element: null,
      },
    ],
  },
  {
    key: 'finance',
    icon: <DollarOutlined />,
    label: 'Tài chính',
    children: [
      {
        key: 'finance-transactions',
        path: '/finance/transactions',
        icon: <WalletOutlined />,
        label: 'Thu chi',
        element: null,
      },
      {
        key: 'finance-analytics',
        path: '/finance/analytics',
        icon: <LineChartOutlined />,
        label: 'Phân tích',
        element: null,
      },
    ],
  },
  {
    key: 'time',
    icon: <FieldTimeOutlined />,
    label: 'Thời gian',
    children: [
      {
        key: 'time-progress',
        path: '/time/progress',
        icon: <RiseOutlined />,
        label: 'Theo dõi tiến độ',
        element: null,
      },
      {
        key: 'time-habits',
        path: '/time/habits',
        icon: <HeartOutlined />,
        label: 'Thói quen',
        element: null,
      },
      {
        key: 'time-pomodoro',
        path: '/time/pomodoro',
        icon: <CalendarOutlined />,
        label: 'Pomodoro',
        element: <pages.Pomodoro />,
      },
    ],
  },
  {
    key: 'useful',
    icon: <BookOutlined />,
    label: 'Hữu ích',
    children: [
      {
        key: 'useful-websites',
        path: '/useful/websites',
        icon: <GlobalOutlined />,
        label: 'Website',
        element: <pages.Website />,
      },
      {
        key: 'useful-other',
        path: '/useful/other',
        icon: <HeartOutlined />,
        label: '?',
        element: null,
      },
    ],
  },
];

export const secondaryRoutes = [
  {
    key: 'settings',
    path: '/settings',
    icon: <SettingOutlined />,
    label: 'Cài đặt',
    element: null,
  },
];

/**
 * Flatten routes để dễ dàng generate <Route> components
 * Trả về mảng các route có path và element
 */
export function getFlatRoutes(routeList = routes) {
  const flatRoutes = [];

  const flatten = (items) => {
    items.forEach((item) => {
      if (item.path) {
        flatRoutes.push({
          path: item.path,
          element: item.element,
        });
      }
      if (item.children) {
        flatten(item.children);
      }
    });
  };

  flatten(routeList);
  flatten(secondaryRoutes);

  return flatRoutes;
}

/**
 * Chuyển routes thành format menu items của Ant Design
 */
export function getMenuItems(routeList) {
  return routeList.map((route) => ({
    key: route.key,
    icon: route.icon,
    label: route.label,
    path: route.path, // Thêm path vào để Sidebar có thể navigate
    children: route.children ? getMenuItems(route.children) : undefined,
  }));
}

