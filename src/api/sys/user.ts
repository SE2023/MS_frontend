import { defHttp } from '/@/utils/http/axios'
import {
  LoginParams,
  RegisterParams,
  LoginResultModel,
  GetUserInfoModel,
  TopUpParams,
  SetMembershipParams,
} from './model/userModel'

import { ErrorMessageMode } from '/#/axios'

enum Api {
  Login = '/login',
  Logout = '/user/logout',
  User = '/user',
  GetUserInfo = '/user',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  Consumer = '/consumer',
  StaffEmail = '/staffEmail',
  Staff = '/staff',
  Membership = '/membership',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  console.log('loginApi')
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: user register api
 */
export function registerApi(params: RegisterParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Staff,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode })
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout })
}

/**
 * @description: top up
 */
export function topUpApi(params: TopUpParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Membership + '/recharge' + '/' + params.id,
      params: {
        recharge: params.recharge,
      },
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: set a membership
 */
export function setMembershipApi(params: SetMembershipParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Membership + '/set' + '/' + params.id,
      params: {
        balance: params.balance,
      },
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description: delete a user
 */
export function deleteUserApi(username: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete(
    {
      url: Api.User + '/' + username,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export function getSMSCode() {
  return defHttp.post({
    url: Api.StaffEmail,
  })
}

export function getUserListByRole(role: String) {
  return defHttp.get({
    url: Api.GetUserInfo + '/' + role,
  })
}

export function getMembershipList() {
  return defHttp.get({
    url: Api.Membership,
  })
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  )
}
