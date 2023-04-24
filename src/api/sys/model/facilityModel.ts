/**
 * @description Facility interface return value
 */
export interface FacilityResultModel {
  id: number
  name: string
  status: string
  type: string
  manager_name: string
  manager_tel: string
  free: number
}

export interface FacilityModel {
  type: string
  name: string
  status: string
  manager_name: string
  manager_tel: string
}
