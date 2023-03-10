import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { RoleEnum } from '/@/enums/roleEnum'

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
    {
      path: 'staff',
      name: 'Staff',
      component: () => import('/@/views/users/staff/index.vue'),
      meta: {
        title: 'Staff',
        roles: [RoleEnum.MANAGER],
      },
    },
  ],
}

export default users
