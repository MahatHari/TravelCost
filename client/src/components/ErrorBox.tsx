import React, { useContext, useEffect, useRef } from 'react';
import { ErrorContext } from './ErrorContext';
import L from 'leaflet';

/** Component for showing error messages */
function ErrorBox(): JSX.Element | null {

    const { msg, showError } = useContext(ErrorContext);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (msg && ref.current) {
            L.DomEvent.disableClickPropagation(ref.current);
            L.DomEvent.disableScrollPropagation(ref.current);
        }
    }, [msg]);

    return (
        msg ?
            <div className='fixed top-0 left-0 w-64 p-2 shadow bg-yellow-400 text-base text-center align-middle pointer-events-auto cursor-auto'
                style={{ zIndex: 9999 }}
                ref={ref}>
                <div>
                    {msg}
                </div>
                <button className='text-sm hover:underline text-red-700 p-3'
                    onClick={() => showError(undefined)}>
                    CLOSE MESSAGE
                </button>
            </div> : null
    );
}

export default ErrorBox;