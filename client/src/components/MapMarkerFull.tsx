import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { MapConsumer } from 'react-leaflet';
import MapMarkerDraggable from './MapMarkerDraggable';

interface IMMFProps {
    /** ID string to keep track of markers */
    id: string;
    /** Marker color */
    color?: string;
    /** LatLng position */
    position: L.LatLng | L.LatLngLiteral | undefined;
    /** For lifting position state up */
    setPosition: (pos: L.LatLng | L.LatLngLiteral | undefined) => void;
}

function MapMarkerFull(props: IMMFProps): JSX.Element {

    const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);
    
    /** Rep to the map */
    const mapRef = useRef<L.Map>();
    /** Ref to the marker being dragged */
    const divRef = useRef<HTMLDivElement>(null);
    
    // Only update if position changes
    const position = useMemo(() => {
        return props.position;
    }, [props.position?.lat, props.position?.lng]);

    // Pan to marker when position is changed
    useEffect(() => {
        if (position && mapRef.current) {
            mapRef.current.panTo(position);
        }
    }, [position]);

    // For asserting event types
    function isReactMouseEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>):
        e is React.MouseEvent<HTMLDivElement, MouseEvent> {
        return e.type === 'mousedown';
    }
    function isReactTouchEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>):
        e is React.TouchEvent<HTMLDivElement> {
        return e.type === 'touchstart';
    }
    function isMouseEvent(e: MouseEvent | TouchEvent):
        e is MouseEvent {
        return e.type === 'mousedown' || e.type === 'mousemove' || e.type === 'mouseleave' || e.type === 'mouseup';
    }
    function isTouchEvent(e: MouseEvent | TouchEvent):
        e is TouchEvent {
        return e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel';
    }

    /** When dragging begins */
    function onStart(e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) {
        if (isReactMouseEvent(e)) e.preventDefault();
        setIsBeingDragged(true);

        // Put marker on top
        e.currentTarget.style.position = 'fixed';
        e.currentTarget.style.zIndex = '9999';

        // Set styles
        e.currentTarget.style.cursor = 'grabbing';
        e.currentTarget.classList.add('md-36');
        e.currentTarget.classList.remove('transform');

        if (isReactMouseEvent(e)) {

            // Move marker to mouse position
            e.currentTarget.style.top = (e.clientY - 18).toString() + 'px';
            e.currentTarget.style.left = (e.clientX - 18).toString() + 'px';

            // Set up mouse listeners
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseleave', onOut);
            e.currentTarget.addEventListener('mouseup', onStop);

        }
        else if (isReactTouchEvent(e)) {

            // Move marker to touch position
            e.currentTarget.style.top = (e.touches[0].clientY - 18).toString() + 'px';
            e.currentTarget.style.left = (e.touches[0].clientX - 18).toString() + 'px';

            // Set up touch listeners
            e.currentTarget.addEventListener('touchcancel', onStop);
            e.currentTarget.addEventListener('touchmove', onTouchMove);
            e.currentTarget.addEventListener('touchend', onStop);
        }
        else console.log('ERROR!');
    }

    /** Update marker position while being dragged */
    function onMouseMove(this: Document, e: MouseEvent) {
        if (divRef.current) {
            divRef.current.style.top = (e.clientY - 18).toString() + 'px';
            divRef.current.style.left = (e.clientX - 18).toString() + 'px';
        }
        else console.log('ERROR!');
    }
    function onTouchMove(this: HTMLDivElement, e: TouchEvent) {
        this.style.top = (e.touches[0].clientY - 18).toString() + 'px';
        this.style.left = (e.touches[0].clientX - 18).toString() + 'px';
    }

    /** Reset marker if mouse is dragged outside current window */
    function onOut(this: Document) {
        if (divRef.current) {
            divRef.current.style.position = '';
            divRef.current.style.zIndex = '';
            divRef.current.style.cursor = 'pointer';
            divRef.current.classList.remove('md-36');
            divRef.current.classList.add('transform');

            divRef.current.removeEventListener('mouseup', onStop);
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onOut);
        setIsBeingDragged(false);
    }

    /** When marker is dropped being dragged */
    function onStop(this: HTMLDivElement, e: MouseEvent | TouchEvent) {

        let elementUnderMarker;
        let containerPoint;

        // Find final coordinates & element underneath dropped marker
        if (isMouseEvent(e)) {
            this.style.pointerEvents = 'none';
            elementUnderMarker = document.elementFromPoint(e.clientX, e.clientY);
            this.style.pointerEvents = 'auto';

            containerPoint = L.point(e.clientX, e.clientY + 16);
        }
        else if (isTouchEvent(e)) {
            this.style.pointerEvents = 'none';
            elementUnderMarker = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            this.style.pointerEvents = 'auto';

            containerPoint = L.point(e.changedTouches[0].clientX, e.changedTouches[0].clientY + 16);
        }
        else console.log('ERROR!');

        // Send position upstream if droppd on theMap
        if (mapRef.current && containerPoint && elementUnderMarker && elementUnderMarker.classList.contains('theMap')) {
            props.setPosition(mapRef.current.containerPointToLatLng(containerPoint));
        }
        else {
            // Reset if dropped on UI
            this.style.position = '';
            this.style.zIndex = '';
            this.style.cursor = 'pointer';
            this.classList.remove('md-36');
            this.classList.add('transform');
            setIsBeingDragged(false);
        }

        // Clean up afterwards
        if (isMouseEvent(e)) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onOut);
            this.removeEventListener('mouseup', onStop);
            setIsBeingDragged(false);
        }
        else if (isTouchEvent(e)) {
            this.removeEventListener('touchcancel', onStop);
            this.removeEventListener('touchmove', onTouchMove);
            this.removeEventListener('touchend', onStop);
            setIsBeingDragged(false);
        }
        else console.log('ERROR!');
    }

    return (
        <span>
            {position &&
                <MapMarkerDraggable
                    position={position}
                    setPos={props.setPosition}
                    color={props.color} />}

            {(!position) &&
                <MapConsumer>
                    {map => {
                        mapRef.current = map;

                        return (
                            <div key={props.id} className='material-icons select-none float-right transform translate -translate-x-1/3 -translate-y-0.5'
                                ref={divRef}
                                onMouseDownCapture={(e) => onStart(e)}
                                onTouchStartCapture={(e) => onStart(e)}
                                style={{ color: props.color, cursor: 'pointer' }}>
                                place
                            </div>
                        );
                    }}
                </MapConsumer>}
            {isBeingDragged &&
                <div className='material-icons select-none float-right transform translate -translate-x-1/3 -translate-y-0.5'>
                    place
                </div>
            }
            {position &&
                <MapConsumer>
                    {map => {
                        return (<div className='material-icons cursor-pointer select-none float-right transform translate -translate-x-1/3 -translate-y-0.5'
                            style={{ color: props.color }}
                            onClick={() => { if (position) map.panTo(position); }}>
                            place
                        </div>);
                    }}
                </MapConsumer>
            }
        </span>
    );
}

export default MapMarkerFull;