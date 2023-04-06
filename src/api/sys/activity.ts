import { defHttp } from '/@/utils/http/axios'

import { ErrorMessageMode } from '/#/axios'

enum Api {
  Activity = '/activity',
}

/**
 * @description get activity list
 */
export function getActivityListWithTimeApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: Api.Activity + '/all-with-time',
    },
    {
      errorMessageMode: mode,
    },
  )
}
