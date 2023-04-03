/**
 * @description Facility interface return value
 */
export interface FacilityResultModel {
  id: number
  name: string
  capacity: number
  status: string
  type: string
  contact: string
  telephone: string
  free: number
}

export interface FacilityModel {
  type: string
  name: string
  status: string
  capacity: number
  contact: string
  telephone: string
}
