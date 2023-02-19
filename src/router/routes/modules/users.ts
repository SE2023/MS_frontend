import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const users: AppRouteModule = {
  path: '/users',
  name: 'Users',
  component: LAYOUT,
  redirect: '/users/nonmembers',
  meta: {
    orderNo: 2,
    icon: 'ant-design:user-outlined',
    title: 'Users',
  },
  children: [
    {
      path: 'nonmembers',
      name: 'Nonmembers',
      component: () => import('/@/views/users/nonmembers/index.vue'),
      meta: {
        // affix: true,
        title: 'Nonmembers',
      },
    },
    {
      path: 'members',
      name: 'Members',
      component: () => import('/@/views/users/members/index.vue'),
      meta: {
        title: 'Members',
      },
    },
  ],
}

export default users
