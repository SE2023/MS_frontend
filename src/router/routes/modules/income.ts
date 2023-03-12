import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const income: AppRouteModule = {
  path: '/income',
  name: 'Income',
  component: LAYOUT,
  redirect: '/income/index',
  meta: {
    orderNo: 4,
    hideChildrenInMenu: true,
    icon: 'ant-design:money-collect-outlined',
    title: 'Income',
  },
  children: [
    {
      path: 'index',
      name: 'Income',
      component: () => import('/@/views/income/index.vue'),
      meta: {
        title: 'Income',
        icon: 'ant-design:money-collect-outlined',
        hideMenu: true,
      },
    },
  ],
}

export default income
