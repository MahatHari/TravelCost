import React from 'react';
import MapMarker, { IMapMarkerProps } from './MapMarker';
import L from 'leaflet';
import { MapConsumer } from 'react-leaflet';

export interface IDraggableProps extends IMapMarkerProps {
    setPos?: (pos: L.LatLng | L.LatLngLiteral | undefined) => void;
}

function MapMarkerDraggable(props: IDraggableProps): JSX.Element {

    return (
        <MapConsumer>
            {map => {
                return (
                    <MapMarker
                        {...props}
                        autoPan={true}
                        autoPanPadding={L.point(50, 75)}
                        draggable={true}
                        eventHandlers={{
                            moveend: (event) => {
                                const latlng = event.sourceTarget._latlng as L.LatLngLiteral;
                                if (props.setPos) props.setPos(latlng);
                                if (!map.getBounds().contains(latlng)) {
                                    map.panTo(event.sourceTarget._latlng as L.LatLngLiteral);
                                }
                            }
                        }}>
                        {props.children}
                    </MapMarker>
                );
            }}
        </MapConsumer>
    );
}

export default MapMarkerDraggable;