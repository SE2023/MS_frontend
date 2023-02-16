import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const facilities: AppRouteModule = {
  path: '/facilities',
  name: 'Facilities',
  component: LAYOUT,
  redirect: '/facilities/overview',
  meta: {
    orderNo: 1,
    icon: 'mdi:pool',
    title: 'Facilities',
  },
  children: [
    {
      path: 'overview',
      name: 'Overview',
      component: () => import('/@/views/facilities/overview/index.vue'),
      meta: {
        // affix: true,
        title: 'Overview',
      },
    },
    {
      path: 'activities',
      name: 'Activities',
      component: () => import('/@/views/facilities/activities/index.vue'),
      meta: {
        title: 'Activities',
      },
    },
  ],
}

export default facilities
