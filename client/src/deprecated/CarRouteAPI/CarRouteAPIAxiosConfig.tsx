import axios from 'axios';

const CarRouteInstance = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox',
  method: 'GET'
});
CarRouteInstance.defaults.headers.get['Accepts'] = 'Access-Control-Allow-Origin:*';
CarRouteInstance.defaults.headers.get['Accepts'] = 'application/json; charset=utf-8';

export default CarRouteInstance;