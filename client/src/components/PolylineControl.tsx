import React, { useContext, useEffect, useState } from 'react';
import { Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { ResponseContext } from './ResponseContext';
import { TransitMode, ModeColorCSS as ModeColor, ModeHover } from './TransitTypes';

// eslint-disable-next-line
const PL = require('google-polyline');

interface ILegs {
    pub: {
        lines: string[];
        mode: TransitMode[];
    }
    car: {
        lowres: string;
        hires: string[][];
    };
}

interface IPolylines {
    pub: JSX.Element[],
    lowcar: JSX.Element,
    hicar: JSX.Element[][]
}

interface IPLCProps {
    zoomBounds?: (bounds: L.LatLngBounds) => void;
}

function PolylineControl(props: IPLCProps): JSX.Element {
    const { current } = useContext(ResponseContext);
    const [polylines, setPolylines] = useState<IPolylines>();

    // When new data is fetched from APIs.
    useEffect(() => {

        // Return if no data is found.
        if (!current) return;

        // Further parse the API responses.
        const pubGoogleLines = current.pubDf.legs.map(leg => {
            return leg.legGeometry.points;
        });

        const pubModes = current.pubDf.legs.map(leg => {
            return leg.mode;
        });

        const carLowResLine = current.carDf.geometry;
        const carHiResLine = current.carDf.legs.map((leg) => {
            return leg.steps.map((step) => (step.geometry));
        });

        const legs: ILegs = {
            pub: {
                lines: pubGoogleLines,
                mode: pubModes
            },
            car: {
                lowres: carLowResLine,
                hires: carHiResLine
            }
        };

        // Decode and generate polyline elements.
        const decodedPubLines = legs.pub.lines.map((line) => {
            return PL.decode(line) as L.LatLngTuple[];
        });
        const decodedLowResCarLine = PL.decode(legs.car.lowres) as L.LatLngTuple[];
        const decodedHiResCarLine = legs.car.hires.map(step => {
            return step.map(line => {
                return PL.decode(line) as L.LatLngTuple[];
            });
        });

        const newLowResCarLine = <Polyline key={'carLine'} color={ModeColor['CAR']} positions={decodedLowResCarLine} />;
        const newHiResCarLine = decodedHiResCarLine.map(((line) => {
            return line.map((shortLine, ind) => {
                return (
                    <Polyline
                        key={shortLine[0][0].toString() + shortLine[0][1].toString() + ind}
                        color={ModeColor['CAR']}
                        positions={shortLine} >
                        <Tooltip>
                            {ModeHover['CAR']}
                        </Tooltip>
                    </Polyline>
                );
            });
        }));

        const newPubLines = decodedPubLines.map((line, ind) => {
            return (
                <Polyline
                    key={legs.pub.mode[ind] + ind}
                    color={ModeColor[legs.pub.mode[ind]]}
                    dashArray={legs.pub.mode[ind] === 'WALK' ? '4' : ''}
                    positions={line}
                    interactive={true} >
                    <Tooltip>
                        {ModeHover[legs.pub.mode[ind]]}
                    </Tooltip>
                </Polyline>
            );
        });

        // Insert Polyline components into state. 
        setPolylines({
            pub: newPubLines,
            lowcar: newLowResCarLine,
            hicar: newHiResCarLine
        });

        // Optionally set zoom level.
        if (props.zoomBounds) {
            const polylineBounds = L.polyline([decodedLowResCarLine, ...decodedPubLines]).getBounds();
            props.zoomBounds(polylineBounds);
        }

    }, [current]);

    return (
        <div>
            {polylines && polylines.pub}
            {polylines && polylines.hicar}
        </div>
    );
}

export default PolylineControl;