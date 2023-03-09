import { defHttp } from '/@/utils/http/axios'
import { FacilityResultModel } from '/@/api/sys/model/facilityModel'

enum Api {
  Facility = '/facility',
}

/**
 * @description get facility list
 */
export function getFacilityList() {
  return defHttp.get<FacilityResultModel[]>({
    url: Api.Facility,
  })
}
