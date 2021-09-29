export type routes = {
  weight_name: string | null,
  weight: number | null,
  geometry: string,
  duration: number,
  distance: number,
  location: number[]
};

export type waypoints = {
  distance: number,
  name: string,
  location: number[]
}
export interface ICarRouteAPI {
  routes: routes[]
  waypoints: waypoints[]
  code: string,
  uuid: string
}

