import React from 'react';
import { IRawResponse } from './RouteFetch.types';
import { ICurrent, IParsedResponse } from './ResponseProvider';
import { IPrice } from '../Pricing';

interface IResponseContext {
    /** Raw response data, should only be used internally in the context to calculate parsed values */
    raw?: IRawResponse;

    /** To set API response into the context */
    setRaw: (newResponse: IRawResponse) => void;

    /** Parsed values that are calculated only once whenever new raw data is received */
    parsed?: IParsedResponse;

    /** Currently selected itineraries, recalculated every time a new itinerary is selected */
    current?: ICurrent;

    /** Currently selected public itinerary (array index of parsed.pubItins) */
    currentPubItin: number;

    /** Change currently selected itinerary (MUST be a valid array index of parsed.pubItins) */
    setCurrentPubItin: (i: number) => void;

    /** Array of price objects for each leg in each itinerary, array indexing follows parsed.pubItins and parsed.pubItins[ind].legs */
    prices: IPrice[][];

    /** Update a single price in prices array 
     * @param itin Valid array index of the itinerary to be updated
     * @param leg Valid array index of the leg to be updated
     * @param price New price
    */
    updatePrice: (itin: number, leg: number, price: number) => void;

    /** Combined total price of currently selected itinerary */
    currentPrice?: IPrice;
}

export const ResponseContext = React.createContext<IResponseContext>(
    {
        parsed: undefined,
        raw: undefined,
        setRaw: (newResponse: IRawResponse) => {
            console.log(`Someone didn't set up the context properly!\n${newResponse}`);
        },
        currentPubItin: 0,
        setCurrentPubItin: (i: number) => {
            console.log(`Someone didn't set up the context properly!\n${i}`);
        },
        prices: [],
        updatePrice: (i, l, p) => {
            console.log(`Someone didn't set up the context properly!\n${i + l + p}`);
        }
    }
);