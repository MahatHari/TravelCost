# Intended Use 
The app was designed to allow the user to compare public transit fares with the cost of travel by personal vehicle for a single trip. It was created as an exercise project for a Typescript course and is up to the requirements of that course.

# Project Initialization
To make the MapBox API work, create a .env file inside the client-folder and in the .env file add the following: 
```
REACT_APP_MAPBOX_TOKEN=<your mapbox API KEY>
```
To run the App, run the following command inside the client-folder:
```
npm start
```
The platform is styled with Tailwind CSS, and if you make any changes to the Tailwind config, it needs to be recompiled by running:
```
npm run build-css
```

# Current State of the Project
List of currently implemented features:
- Select origin/destination, time of departure and transit methods
- Setup car information
- Display comparison between car and public transit
- Display route information on the map & trip details
- The pricing information currently consists mostly of hardcoded crude estimates, only HSL prices come from a proper API call
- Estimated prices are displayed in orange and actual prices are in blue 

# Future Features
- More accurate ticket prices
- Implement car fuel economy database
- Waypoints
- Two-way trips
- User profiles
- GPS geolocation

# Known Issues
- The version of Date-Time picker used is still using findDOMNode which is deprecated in React StrictMode. This will occasionally throw errors in console which can be ignored.

# Used Technologies/Resources
- [Leaflet](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Design Icons](https://material.io/resources/icons/?style=baseline)
- [Material-UI Pickers](https://material-ui-pickers.dev/)
- [Digitransit](https://digitransit.fi/en/developers/)
- [MapBox](https://docs.mapbox.com/api/navigation/)

# Licensing Information
The API used in our platforms is dual-licensed under the RUPL v1.2 and AGPLv3 licenses.
Our source code can be used under the GNU license.