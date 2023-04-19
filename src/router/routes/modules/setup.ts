import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const setup: AppRouteModule = {
  path: '/setup',
  name: 'SetupDemo',
  component: LAYOUT,
  redirect: '/setup/index',
  meta: {
    orderNo: 8,
    hideChildrenInMenu: true,
    icon: 'whh:paintroll',
    title: 'Guide Page',
  },
  children: [
    {
      path: 'index',
      name: 'SetupDemoPage',
      component: () => import('/@/views/setup/index.vue'),
      meta: {
        title: 'Guide Page',
        icon: 'whh:paintroll',
        hideMenu: true,
      },
    },
  ],
}

export default setup
