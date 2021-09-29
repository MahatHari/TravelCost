/* eslint-disable */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Popup, Tooltip, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import { ResponseContext } from '../components/ResponseContext';
import MapMarker from '../components/MapMarker';
import MapMarkerDraggable from '../components/MapMarkerDraggable';
import LocationMarker, { LocationHandler } from './DragTest';
import ErrorBox from '../components/ErrorBox';
import { ErrorContext } from '../components/ErrorContext';
// import { prices, price, endPrice } from '../Pricing';

interface ITestProps {
    cursor?: () => void;
    setGoogleLines?: React.Dispatch<React.SetStateAction<string[]>>;
    googleLines?: string[];
}

function Test(props: ITestProps): JSX.Element {
    const [zoomLevel, setZoomLevel] = useState(13);
    const [coords, setCoords] = useState([0, 0]);
    const { parsed, current, currentPubItin, setCurrentPubItin, updatePrice, prices, currentPrice } = useContext(ResponseContext);
    const [pos, setPos] = useState<[number, number] | undefined>();
    const { showError } = useContext(ErrorContext);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        prices.forEach(price => {
            console.log(price);
        })
        console.log('Current price: ' + currentPrice?.estimate + ' ' + currentPrice?.price);
    }, [prices]);

    useEffect(() => {
        if (divRef.current) L.DomEvent.disableClickPropagation(divRef.current);
    }, []);

    useEffect(() => {
        if (parsed) {
            console.log('Public route duration from the context: ');
            console.log(parsed.pubItins[currentPubItin].duration);


            console.log('Car route duration from the context: ');
            console.log(parsed.carRoute.duration);

            console.log('Current itinerary: ' + currentPubItin);
        }
        if (parsed) {
            console.log('From Parsed values:');
            console.log(parsed);
        }
    }, [parsed]);

    // conflict with map.setBounds();
    // setTimeout() = hack solution but works for now
    const map = useMapEvent('zoomend', () => {
        (async () => {
            setTimeout(() => {
                setZoomLevel(map.getZoom());
            }, 100);
        })();
    });

    useMapEvent('dblclick', (event) => {
        setCoords([event.latlng.lat, event.latlng.lng]);
    });

    function toggleCursor() {
        if (props.cursor) props.cursor();
    }

    function addLines() {
        const lines = ([
            'svfnJ_jdwCtAxFVx@zBbGx@vBbCbFxB|DnDfEb@r@P^^n@BBhApCj@`Bv@fDn@hE\\hDRbDTnLDtGJbGXtZA~EI`DMxCY`Gs@|MUrFEpE@jDFrDLbDLrBVnCb@lDr@hExC|Nt@lEr@jFp@~Fv@vHjBvPrBlRfA~JXlCZ`DZtC`@vD\\`EPzCJhCDjC?rCArCKfEOlDWbD]nC[|Bi@zCq@|CcAhDo@lBwCnH}@dCm@tBs@lCo@rCg@lCc@tCm@dFmChWUbCuCxYQ~A_Dd\\E^gHzr@sAdMm@vDo@zC}@dDu@rBy@pBq@lAkAfBgArAsAjAuA~@eAd@aATcAPsAJ{@AgAKmASmAe@mAq@sAaAgEmD_Aw@qAiAqAcAmDsCiDoCkB}AeAw@gAo@cAa@oA[y@G_A@}@H{@Rw@Tw@b@u@h@u@r@o@v@m@z@}@fB{@pBi@~Ae@~A_@fBc@fCYjCUnCMpCK`DIrDEdDEhDEjEApEHrDRlDXhCZnB\\jBd@hBf@`Bj@bBn@nAt@rA|@jAl@n@|@r@bAt@rFvC|F|CjAl@vAz@l@\\l@`@t@n@p@n@x@dA~@xA|@fBl@`Bl@jBl@fCp@`Df@pDt@pJXrCBVLlCf@tHTxEFnDDdD@rDAdFCnZCrNErQ?bDAhFEtOAhE?|B?|J?lGBlDLhDPdDTdCX|Bd@`Dh@hCj@bCz@vChB`GfMta@l@nBdBzFnF`QlBdFrBjE`CrDxSrZ~@tAv@tA~@jBv@hBp@rBl@vBh@vB`@zBb@nC|AtLvBvPj@pEHfA"',
            'q}dnJy|~uCBAG_@SaBAIIFe@b@MJ@D?Dy@t@BZTdB@H@H@H@H?B@D@L@D?BRM',
            'e`enJow~uCNTJj@b@nA@LHf@VQP_A`@SNfALfAdAxHDdAPfAJbANfADf@d@hDHn@L|@Z`Cv@nGtA|JlAnGn@~CPf@oAzAa@^qBjAy@Ri@Dm@?k@OqAk@}A@]JKFaBnAq@h@_@j@c@d@u@~@e@r@cDtFs@zAs@~@~@fFT`BLfALrBJfCLzCn@zTPnKAzNAjAE~HI|DOtGU~Im@AYPo@^iB`@cANk@Dy@Rm@VcAl@s@p@g@l@i@z@_A~A{@~BMb@]pAwAjFOf@_ApBe@v@wCrCu@bAk@bAo@vAc@tAs@tCg@tBsAbF]vCOtAi@nFKt@Kz@Kr@a@dAi@x@uAx@cA^a@D{BBw@?uADE?H|BFjBEjB',
        ]);

        if (props.setGoogleLines && props.googleLines && props.googleLines.length === 0) props.setGoogleLines(lines);
    }

    function typeTesting() {
        const asdf: number[] = [1, 2];
        const fdsa: number[] = new Array(asdf.length);
        fdsa[10];

    }

    return (
        <div ref={divRef}
            style={{
                position: 'absolute',
                zIndex: 1000,
                cursor: 'auto',

                bottom: '0px',
                backgroundColor: 'white',
                fontSize: 'xx-large',
                paddingLeft: '10px',
                paddingRight: '10px',
            }}>
            {/* ZoomLevel:&nbsp;{zoomLevel}
            {/* <MapMarker position={{ lat: 60.45169, lng: 22.26686 }} color='red' >
                <Tooltip>
                Hello,
                </Tooltip>
                <Popup>
                World!
                </Popup>
            </MapMarker> */}
            {/* &nbsp;{`| Coords: ${coords[0].toFixed(5)},${coords[1].toFixed(5)}`}
            {props.cursor && <span>
                &nbsp;|&nbsp;<button onClick={toggleCursor}>Toggle Cursor</button>
            </span>}
            <MapMarkerDraggable position={{ lat: 60.45169, lng: 22.26686 }} color='red' />
            <MapMarker position={{ lat: 60.45169, lng: 22.26686 }} color='blue' />
            &nbsp;|&nbsp;<button
                onClick={() => {
                    if (parsed && currentPubItin + 1 !== parsed.pubItins.length) {
                        setCurrentPubItin(currentPubItin + 1);
                    }
                    else setCurrentPubItin(0);
                }}
            >Change Itinerary</button>
            &nbsp;|&nbsp;<LocationHandler />
            <ErrorBox />
            &nbsp;|&nbsp;<button onClick={() => showError('a really really long error message from a programmer who wants to be very specific about the error and give a dump to the user for some reason')}>Error</button> */}
            <button onClick={() => {
                updatePrice(currentPubItin, 0, 1000);
            }}>ChangePrice</button>
        </div>
    );

    // return <MapMarker position={{ lat: 60.45169, lng: 22.26686 }} color='red' />;
}

export default Test;