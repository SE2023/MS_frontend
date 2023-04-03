import { defHttp } from '/@/utils/http/axios'
import { FacilityResultModel, FacilityModel } from '/@/api/sys/model/facilityModel'
import { ErrorMessageMode } from '/#/axios'

enum Api {
  Facility = '/facility',
}

/**
 * @description get facility list
 */
export function getFacilityListApi() {
  return defHttp.get<FacilityResultModel[]>({
    url: Api.Facility,
  })
}

/**
 * @description add a facility
 */
export function addFacilityApi(params: FacilityModel, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Facility,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description update a facility
 */
export function editFacilityApi(
  id: number,
  params: FacilityModel,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.put(
    {
      url: Api.Facility + '/' + id,
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

/**
 * @description delete a facility
 */
export function deleteFacilityApi(id: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete(
    {
      url: Api.Facility + '/' + id,
    },
    {
      errorMessageMode: mode,
    },
  )
}
