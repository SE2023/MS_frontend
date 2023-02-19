import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const bookings: AppRouteModule = {
  path: '/bookings',
  name: 'Bookings',
  component: LAYOUT,
  redirect: '/bookings/unused',
  meta: {
    orderNo: 3,
    icon: 'fluent-mdl2:reservation-orders',
    title: 'Bookings',
  },
  children: [
    {
      path: 'unused',
      name: 'Unused',
      component: () => import('/@/views/bookings/unused/index.vue'),
      meta: {
        // affix: true,
        title: 'Unused',
      },
    },
    {
      path: 'used',
      name: 'Used',
      component: () => import('/@/views/bookings/used/index.vue'),
      meta: {
        title: 'Used',
      },
    },
  ],
}

export default bookings
