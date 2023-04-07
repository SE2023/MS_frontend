import { defHttp } from '/@/utils/http/axios'

import { TimeUnityModel, ActivityModel } from '/@/api/sys/model/activityModel'

import { ErrorMessageMode } from '/#/axios'

enum Api {
  Activity = '/activity',
  TimeUnity = '/timeUnity',
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

/**
 * @description create a timeUnity
 */
export function createTimeUnityApi(params: TimeUnityModel, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.TimeUnity,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description create an activity
 */
export function createActivityApi(
  timeUnityId: number,
  params: ActivityModel,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post(
    {
      url: Api.Activity + '/' + timeUnityId,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}
