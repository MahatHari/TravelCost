import React, { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line
import Test from '../devtools/Test';
import ZoomToNewLayer from './MapLeaflet.ZoomToNewLayer';
import PolylineControl from './PolylineControl';

interface IMapProps {
  children?: JSX.Element | JSX.Element[];
}

function MapLeaflet(props: IMapProps): JSX.Element {
  const [mapStyle, setMapStyle] = useState<React.CSSProperties>({
    height: '100%',
    width: '100%',
    padding: '0px',
    position: 'fixed',
    bottom: '0',
    right: '0',
    cursor: 'grab',
  });

  const [currentBounds, setCurrentBounds] = useState<L.LatLngBounds>();

  // Currently used only for testing
  // eslint-disable-next-line
  function changeCursor() {
    if (mapStyle.cursor === 'grab') {
      setMapStyle({ ...mapStyle, cursor: 'crosshair' });
    } else setMapStyle({ ...mapStyle, cursor: 'grab' });
  }

  return (
    <MapContainer
      className='theMap'
      style={mapStyle}
      center={{ lat: 60.44994, lng: 22.26637 }}
      zoom={13}
      maxBounds={[[74.75275, -24.60938], [52.33911, 66.12639]]}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer
        url='https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png'
        maxZoom={18}
        minZoom={8}
        tileSize={512}
        zoomOffset={-1}
      />

      {/* Free for non-commercial use: https://carto.com/basemaps/ */}
      <TileLayer
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,
                            &nbsp;&copy; <a href="https://carto.com/attribution">CARTO</a>'
        maxZoom={7}
        minZoom={5}
      />

      {/* Custom components */}
      {props.children}

      {/* Controllers */}
      <PolylineControl zoomBounds={setCurrentBounds} />
      <ZoomToNewLayer bounds={currentBounds} />
      <ZoomControl position='bottomright' />

      {/* Devtools */}
      {/* <Test cursor={changeCursor} /> */}
    </MapContainer>
  );
}

export default MapLeaflet;
