import React, { useEffect, useState } from 'react';
import { IItinerary, IRawResponse, IRoutes } from './RouteFetch.types';
import { ResponseContext } from './ResponseContext';
import * as P from '../Pricing';

interface IProviderProps {
    children?: React.ReactNode;
}

export interface IParsedResponse {
    /** Array of all the public transit itineraries (1-3 itineraries) */
    pubItins: IItinerary[];
    /** Default route for car (same as: raw.car[0].routes[0]) */
    carRoute: IRoutes;
}

export interface ICurrent {
    /** Currently selected itinerary for public transit route (same as raw.public[0].plan.itineraries[currentPubItin]) */
    pubDf: IItinerary;
    /** Default route for car (same as: raw.car[0].routes[0]) */
    carDf: IRoutes;
}

function RepsonseProvider(props: IProviderProps): JSX.Element {
    const [raw, setRaw] = useState<IRawResponse>();
    const [parsed, setParsed] = useState<IParsedResponse>();
    const [current, setCurrent] = useState<ICurrent>();
    const [currentPubItin, setCurrentPubItin] = useState<number>(0);
    const [prices, setPrices] = useState<P.IPrice[][]>([]);
    const [currentPrice, setCurrentPrice] = useState<P.IPrice>();

    useEffect(() => {
        if (!raw) return;

        // Parsed should only contain values that are calculated once per API response!
        const pubItineraries = raw.public[0].plan.itineraries;
        const defaultCarRoute = raw.car[0].routes[0];

        // Init prices array with correct length
        const dummyPrice = pubItineraries.map(itin => {
            return itin.legs.map(() => {
                return {
                    estimate: true,
                    price: 0
                };
            });
        });

        setPrices(dummyPrice);
        setParsed({
            pubItins: pubItineraries,
            carRoute: defaultCarRoute,
        });
        setCurrentPubItin(0);
    }, [raw]);

    useEffect(() => {
        if (!parsed) return;

        // Currently selected routes, updates any time a new itinerary is selected.
        const currentPublicItinerary = parsed.pubItins[currentPubItin];
        const currentCarRoute = parsed.carRoute;

        setCurrent({
            pubDf: currentPublicItinerary,
            carDf: currentCarRoute
        });
    }, [currentPubItin, parsed]);

    useEffect(() => {
        if (!parsed) return;

        // Async set correct prices
        (async () => {
            const newPricePromises = parsed.pubItins.map(itin => {
                return P.prices(itin.legs);
            });

            Promise.all(newPricePromises).then(results => {
                setPrices(results);
            });
        })();
    }, [parsed]);

    useEffect(() => {

        // Initialize currentPrice and update it when necessary
        if (prices.length === 0) {
            setCurrentPrice({ estimate: false, price: 0 });
            return;
        }

        const currentFullPrice = prices[currentPubItin].reduce((acc, val) => {
            return {
                estimate: acc.estimate || val.estimate,
                price: acc.price + val.price
            };
        });

        setCurrentPrice(currentFullPrice);
    }, [prices, currentPubItin]);

    /** Update a single price in prices array 
     * @param itin Valid array index of the itinerary to be updated
     * @param leg Valid array index of the leg to be updated
     * @param price New price
    */
    function updatePrice(itin: number, leg: number, price: number): void {
        const newPrices = prices.map(price => {
            return [...price];
        });

        newPrices[itin][leg] = {
            estimate: false,
            price: price
        };

        setPrices(newPrices);
    }

    return (
        <ResponseContext.Provider
            value={{
                raw, setRaw,
                parsed,
                current,
                currentPubItin, setCurrentPubItin,
                currentPrice,
                prices,
                updatePrice
            }}>
            {props.children}
        </ResponseContext.Provider>
    );
}

export default RepsonseProvider;