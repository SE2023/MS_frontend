import { defHttp } from '/@/utils/http/axios'

import { ErrorMessageMode } from '/#/axios'

enum Api {
  Booking = '/booking',
}

/**
 * @description get booking list
 */
export function getBookingListApi(mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: Api.Booking,
    },
    {
      errorMessageMode: mode,
    },
  )
}
