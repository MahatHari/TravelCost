/** Array of all the modes used in the app. */
export const AppModes = [
    'AIRPLANE',
    // 'BICYCLE',
    'BUS',
    'CABLE_CAR',
    // 'CAR',
    'FERRY',
    'FUNICULAR',
    // 'GONDOLA',
    'RAIL',
    'SUBWAY',
    'TRAM',
    // 'TRANSIT', // Special type that includes all public transit options
    'WALK'        // Requires special treatment: prioritize no walk
] as const;

/** All the modes currently used by the app. */
export type TransitMode = typeof AppModes[number];

/** Icon for each mode. */
export enum ModeIcon {
    'AIRPLANE' = 'flight',
    'BICYCLE' = 'directions_bike',
    'BUS' = 'directions_bus',
    'CABLE_CAR' = 'tram',
    'CAR' = 'directions_car',
    'FERRY' = 'directions_boat',
    'FUNICULAR' = 'tram',
    'GONDOLA' = 'rowing',
    'RAIL' = 'train',
    'SUBWAY' = 'subway',
    'TRAM' = 'tram',
    'WALK' = 'directions_walk'
}

/** Color key for each mode. This is not really needed anymore*/
export enum ModeColor {
    'AIRPLANE' = 'AIRPLANE',
    'BICYCLE' = 'BICYCLE',
    'BUS' = 'BUS',
    'CABLE_CAR' = 'CABLE_CAR',
    'CAR' = 'CAR',
    'FERRY' = 'FERRY',
    'FUNICULAR' = 'FUNICULAR',
    'GONDOLA' = 'GONDOLA',
    'RAIL' = 'RAIL',
    'SUBWAY' = 'SUBWAY',
    'TRAM' = 'TRAM',
    'WALK' = 'WALK'
}

/** Color key for each mode. */
export enum ModeColorCSS {
    'AIRPLANE'  = '#EE2F38',
    'BICYCLE'   = '#8CC63E',
    'BUS'       = '#1FCB67',
    'CABLE_CAR' = '#F15A25',
    'CAR'       = '#4299e1',
    'FERRY'     = '#29AAE3',
    'FUNICULAR' = '#00A89D',
    'GONDOLA'   = '#FAAF3C',
    'RAIL'      = '#9161B7',
    'SUBWAY'    = '#5F3713',
    'TRAM'      = '#FBC36E',
    'WALK'      = '#999999'
}

/** Mouseover hover text for each mode. */
export enum ModeHover {
    'AIRPLANE' = 'Airplane',
    'BICYCLE' = 'Bicycle',
    'BUS' = 'Bus',
    'CABLE_CAR' = 'Cable car',
    'CAR' = 'Car',
    'FERRY' = 'Ferry',
    'FUNICULAR' = 'Funicular',
    'GONDOLA' = 'Gondola',
    'RAIL' = 'Train',
    'SUBWAY' = 'Subway',
    'TRAM' = 'Tram',
    'WALK' = 'Walk'
}
