import { Persistent, BasicKeys } from '/@/utils/cache/persistent'
import { CacheTypeEnum } from '/@/enums/cacheEnum'
import projectSetting from '/@/settings/projectSetting'
import { TOKEN_KEY } from '/@/enums/cacheEnum'
import { getUserInfo } from '/@/api/sys/user'

const { permissionCacheType } = projectSetting
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL

export function getToken() {
  return getAuthCache(TOKEN_KEY)
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  return fn(key, value, true)
}

export function clearAuthCache(immediate = true) {
  const fn = isLocal ? Persistent.clearLocal : Persistent.clearSession
  return fn(immediate)
}

// whether there is right to operate
export async function permissionVerify() {
  const userInfo = await getUserInfo()
  return userInfo.roles[0].value === 'Manager'
}

// permission to operate users
export async function permissionVerifyUser(name: string) {
  const userInfo = await getUserInfo()
  console.log(userInfo.username)
  // can not operate yourself
  return userInfo.username !== name
}
