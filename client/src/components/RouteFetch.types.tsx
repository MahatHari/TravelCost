import { TransitMode } from './TransitTypes';

/**********************/
/* Combined responses */
/**********************/

export interface IRawResponse {
    /** Array of responses from public transit API */
    public: IData[];
    /** Array of responses from car route API */
    car: ICarRouteAPI[];
}

/*********************************/
/* Public transit response types */
/*********************************/

// https://api.digitransit.fi/graphiql/finland

export interface IData {
    plan: {
        /** Array of 1-3 possible routes (index 0 should be optimized for speed) */
        itineraries: IItinerary[];
    };
}

export interface IItinerary {
    /** How far the user has to walk, in meters. */
    walkDistance: number;
    /** Duration of the trip on this itinerary, in seconds. */
    duration: number;
    /** A list of Legs. Each Leg is either a walking (cycling, car) portion of the itinerary, or a transit leg on a particular vehicle. 
    *   So a itinerary where the user walks to the Q train, transfers to the 6, then walks to their destination, has four legs. */
    legs: ILeg[];
}

export interface ILeg {
    /** The mode (e.g. WALK) used when traversing this leg. */
    mode: TransitMode;
    /** The date and time when this leg begins. Format: Unix timestamp in milliseconds. */
    startTime: number;
    /** The date and time when this leg ends. Format: Unix timestamp in milliseconds. */
    endTime: number;
    /** The Place where the leg originates. */
    from: IFromLocation;
    /** The Place where the leg ends. */
    to: IToLocation;
    /** For transit legs, the transit agency that operates the service used for this leg. For non-transit legs, null. */
    agency: IAgency | null;
    /** The distance traveled while traversing the leg in meters. */
    distance: number;
    /** The leg's geometry. */
    legGeometry: ILegGeometry;
}

export interface IAgency {
    /** Agency feed and id */
    gtfsId: string;
    /** Name of the agency */
    name: string;
}

export interface ILegGeometry {
    /** The number of points in the string */
    length: number;
    /** List of coordinates of in a Google encoded polyline format */
    points: string;
}

export interface IStop {
    /** Stop code which is visible at the stop */
    code: string;
    /** Name of the stop, e.g. Pasilan asema */
    name: string;
}

export interface IToLocation {
    lat: number;
    lon: number;
    /** For transit stops, the name of the stop. For points of interest, the name of the POI. */
    name: string;
}

export interface IFromLocation extends IToLocation {
    /** The stop related to the place. */
    stop: IStop | null;
}

/****************************/
/* Car route response types */
/****************************/

// https://docs.mapbox.com/api/navigation/

export interface ICarRouteAPI {
    /** Array of Route objects. */
    routes: IRoutes[];
    /** Array of Waypoint objects. */
    waypoints: IWaypoints[];
    /** HTTP status cocde. */
    code: string;
    uuid: string;
}

export interface IRoutes {
    /** A string indicating which weight was used. The default is routability, which is duration-based, with additional penalties for less desirable maneuvers. */
    weight_name: string | null;
    /** A float indicating the weight in units described by weight_name. */
    weight: number | null;
    /** Depending on the geometries query parameter, this is a Polyline string. Depending on the overview query parameter, this is the complete route geometry (full), 
     * a simplified geometry to the zoom level at which the route can be displayed in full (simplified), or is not included (false). */
    geometry: string;
    /** A float indicating the estimated travel time through the waypoints in seconds. */
    duration: number;
    /** A float indicating the distance traveled through the waypoints in meters. */
    distance: number;
    /** An array of route leg objects. */
    legs: ILegs[];
}

export interface IWaypoints {
    /** The straight-line distance from the coordinate specified in the query to the location it was snapped to. */
    distance: number;
    /** A string with the name of the road or path to which the input coordinate has been snapped. */
    name: string;
    /** An array containing the [longitude, latitude] of the snapped coordinate. */
    location: number[];
}

export interface ILegs {
    /** Depending on the optional steps parameter, either an array of route step objects (steps=true) or an empty array (steps=false, default). */
    steps: IStep[];
    /** An array of objects describing the administrative boundaries the route leg travels through. 
     * Use admin_index on the intersection object to look up the administrative boundaries for each intersection in this array. */
    admins: [{
        /** Contains the two-letter ISO 3166-1 alpha-2 code that applies to a country boundary. Example: "US". */
        iso_3166_1_alpha3: string;
        /** Contains the three-letter ISO 3166-1 alpha-3 code that applies to a country boundary. Example: "USA". */
        iso_3166_1: string;
    }];
    /** A number indicating the estimated travel time between waypoints in seconds. */
    duration: number;
    /** A number indicating the distance traveled between waypoints in meters. */
    distance: number;
    weight: number;
    /** A string summarizing the route. */
    summary: string;
}

export interface IStep {
    /** One step maneuver object. */
    maneuver: IManeuver;
    /** An array of objects representing all the intersections along the step: */
    intersections: IIntersection[];
    weight: number;
    /** A number indicating the estimated time traveled in seconds from the maneuver to the next route step. */
    duration: number;
    /** A number indicating the distance traveled in meters from the maneuver to the next route step. */
    distance: number;
    /** A string with the name of the road or path that forms part of the route step. */
    name: string;
    /** The legal driving side at the location for this step. Either left or right. */
    driving_side: 'left' | 'right';
    /** A string indicating the mode of transportation. */
    mode: 'driving' | 'ferry' | 'unaccessible';
    /** Depending on the geometries parameter, this is Polyline string representing the full route geometry from this route step to the next route step. */
    geometry: string;
}

export interface IManeuver {
    /** A string indicating the type of maneuver. See the full list of maneuver types in the maneuver types table. */
    type: string;
    /** A human-readable instruction of how to execute the returned maneuver. */
    instruction: string;
    /** A number between 0 and 360 indicating the clockwise angle from true north to the direction of travel immediately after the maneuver. */
    bearing_after: number;
    /** A number between 0 and 360 indicating the clockwise angle from true north to the direction of travel immediately before the maneuver. */
    bearing_before: number;
    /** An array of [longitude, latitude] coordinates for the point of the maneuver. */
    location: number[];
}

/** WARNING! Not yet fully documented! Actual object may not match the typing! */
export interface IIntersection {
    classes?: string[];
    entry?: boolean[];
    bearings?: number[];
    duration?: number;
    mapbox_streets_v8?: {
        class?: string;
    };
    is_urban?: boolean;
    admin_index?: number;
    out?: number;
    weight?: number;
    geometry_index?: number;
    location?: number[];
    turn_weight?: number;
    in?: number;
    turn_duration?: number;
}
