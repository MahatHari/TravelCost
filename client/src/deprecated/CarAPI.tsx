import React, { useState } from 'react';
import CarRouteAPI from './CarRouteAPI/CarRouteAPI';
import { routes, waypoints } from './CarRouteAPI/CarRouteAPI.d';
// import { ICarRouteAPI } from './components/CarRouteAPI/CarRouteAPI.d';
import CarRouteInstance from './CarRouteAPI/CarRouteAPIAxiosConfig';

const CarAPI: React.FC = () => {
  const [pointA, setPointA] = useState<string>('');
  const [pointB, setPointB] = useState<string>('');
  const [routes, setRoutes] = useState<routes[]>([]);
  const [waypoints, setWaypoints] = useState<waypoints[]>([]);

  const getPointAValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointA(e.currentTarget.value);
  };

  const getPointBValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointB(e.currentTarget.value);
  };

 const submitQueryHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // API call
   try {
     const res = await CarRouteInstance(`/driving/${pointA};${pointB}?alternatives=true&geometries=polyline&steps=true&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`);
     if (res.status === 200) {
       setRoutes(res.data.routes);
       setWaypoints(res.data.waypoints);
       setTimeout(() => {
         console.log(routes);
         console.log(waypoints);
       }, 2000);
     }
   } catch (err) {
     console.log(err);
    }
  };

  return (
      <CarRouteAPI
        pointA={pointA}
        pointB={pointB}
        submitQueryHandler={submitQueryHandler}
        getPointAValue={getPointAValue}
        getPointBValue={getPointBValue}
        />
  );
};

export default CarAPI;
