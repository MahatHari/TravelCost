import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapConsumer } from 'react-leaflet';
import MapMarkerDraggable from '../components/MapMarkerDraggable';
// import MapMarkerFull from '../components/MapMarkerFull';

interface ILMProps {
    /** ID string to keep track of markers */
    id: string;
    /** Marker color */
    color?: string;
    /** LatLng position */
    position: L.LatLngExpression | undefined;
    /** For lifting position state up */
    setPosition: React.Dispatch<React.SetStateAction<L.LatLng | L.LatLngLiteral | L.LatLngTuple | undefined>>;
}

function LocationMarker(props: ILMProps): JSX.Element {

    function onDrop(e: React.DragEvent<HTMLDivElement>, map: L.Map) {
        e.preventDefault();

        const containerPoint = L.point(e.clientX, e.clientY);
        const elementAtDropPoint = document.elementFromPoint(e.clientX, e.clientY);

        // Center map if marker is dropeed outside current view
        if (elementAtDropPoint && elementAtDropPoint.className.includes('theMap')) {
            props.setPosition(map.containerPointToLatLng(containerPoint));
        }
    }

    return (
        <span>
            {props.position && <MapMarkerDraggable position={props.position} setPos={props.setPosition} color={props.color} />}
            <MapConsumer>
                {map => {
                    return (
                        <div className='material-icons' draggable
                            onDragEnd={(e) => onDrop(e, map)}
                            style={{ color: props.color }}>
                            place
                        </div>
                    );
                }}
            </MapConsumer>
        </span>
    );
}

export default LocationMarker;

export function LocationHandler(): JSX.Element {
    const [pos, setPos] = useState<L.LatLngExpression>();

    useEffect(() => {
        console.log(pos);
    }, [pos]);

    return (
        <span>
            <button onClick={() => setPos({ lat: 60.45169, lng: 22.26686 })}>Pos</button>
            {/* &nbsp;|&nbsp;<MapMarkerFull key='asdf' id='origin' position={pos} setPosition={setPos} color='green' /> */}
        </span>
    );
}