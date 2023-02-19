import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const settings: AppRouteModule = {
  path: '/settings',
  name: 'Settings',
  component: LAYOUT,
  redirect: '/settings/index',
  meta: {
    orderNo: 6,
    hideChildrenInMenu: true,
    icon: 'material-symbols:settings',
    title: 'Settings',
  },
  children: [
    {
      path: 'index',
      name: 'Settings',
      component: () => import('/@/views/settings/index.vue'),
      meta: {
        title: 'Settings',
        icon: 'material-symbols:settings',
        hideMenu: true,
      },
    },
  ],
}

export default settings
