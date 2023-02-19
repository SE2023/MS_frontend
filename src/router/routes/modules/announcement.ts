import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const announcement: AppRouteModule = {
  path: '/announcement',
  name: 'Announcement',
  component: LAYOUT,
  redirect: '/announcement/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:notification-twotone',
    title: 'Announcement',
    orderNo: 5,
  },
  children: [
    {
      path: 'index',
      name: 'AnnouncementPage',
      component: () => import('/@/views/announcement/index.vue'),
      meta: {
        title: 'Announcement',
        icon: 'mdi:paper-edit-outline',
        hideMenu: true,
      },
    },
  ],
}

export default announcement
