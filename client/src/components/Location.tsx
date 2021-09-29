import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { ICoordinates } from './RouteFetch';
import MapMarkerFull from './MapMarkerFull';

/** NOTE: Actual response includes other values as well but only these are used by the App */
interface IResponse {
  geometry:
  {
    coordinates: [number, number]
  },
  properties:
  {
    label: string
  }
}
interface IAddress {
  label: string;
  coordinates: [number, number];
}
interface IProps {
  fieldName: string;
  coordinates: {
    position: ICoordinates | undefined;
    setPosition: React.Dispatch<React.SetStateAction<ICoordinates | undefined>>;
  };
}

const Location = (props: IProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [options, setOptions] = useState<IAddress[]>([]);
  const [display, setDisplay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Only update if position changes
  const position = useMemo(() => {
    return props.coordinates.position;
  }, [props.coordinates.position?.lat, props.coordinates.position?.lon]);

  // When user input changes
  useEffect(() => {
    if (!search) {
      setOptions([]);
      return;
    }

    // Autocomplete API call
    (async () => {
      const response = await axios.get(
        `https://api.digitransit.fi/geocoding/v1/autocomplete?text=${search}&layers=localadmin,address`
      );
      if (response.status !== 200) return;

      const body: IResponse[] = response.data.features;
      const location = body.map((a) => {
        return ({
          label: a.properties.label,
          coordinates: a.geometry.coordinates,
        } as IAddress);
      });

      setOptions(location);
    })();

  }, [search]);

  /** When an autocompleted location name is selected */
  const setAddressLabel = (label: string, coordinates: [number, number]) => {
    setSearch(label);
    props.coordinates.setPosition({ lat: coordinates[1], lon: coordinates[0] } as ICoordinates);
    setDisplay(false);
  };

  /** When marker position is changed by dragging it on map */
  const newMarkerPosition = (pos: L.LatLng | L.LatLngLiteral | undefined) => {
    if (!pos) return;
    setSearch('');

    const lat = pos.lat;
    const lon = pos.lng;

    // Find nearby locations and make them selectable on options list
    (async () => {
      const resp = await axios.get(`http://api.digitransit.fi/geocoding/v1/reverse?point.lat=${lat}&point.lon=${lon}&size=5&layers=address`);
      if (resp.status === 200 && resp.data.features.length) {
        const body = resp.data.features as IResponse[];

        const nearbyAddresses = body.map((address) => {
          return {
            coordinates: address.geometry.coordinates,
            label: address.properties.label
          } as IAddress;
        });

        setOptions(nearbyAddresses);
      }
      else return;
    })();

    // Send position upstream
    props.coordinates.setPosition({ lat: pos.lat, lon: pos.lng } as ICoordinates);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); }} action='' className='w-full'>
      <div className=' inline-block text-left, text-blue-700 text-base ml-0 '>
        {props.fieldName}
      </div>

      <div>
        <input
          ref={inputRef}
          onFocus={() => setDisplay(true)}
          onBlur={() => {
            if (!search || !options.length) {
              setDisplay(false);
              return;
            }
            else if (!position) {
              setAddressLabel(options[0].label, options[0].coordinates);
              return;
            }

            const pos = [position.lon, position.lat];
            if (options.some((option) => {
              return (
                option.coordinates.length === pos.length &&
                option.coordinates.every((coordinate, ind) => {
                  return coordinate === pos[ind];
                }));
            })) {
              setDisplay(false);
              return;
            }
            else setAddressLabel(options[0].label, options[0].coordinates);
          }}
          className='border-2 focus:outline-none w-5/6 focus:border-blue ml-0'
          type='text'
          placeholder='Type to Search'
          onChange={(event) => setSearch(event.target.value)}
          value={search}
        ></input>

        <MapMarkerFull key={props.fieldName} id={props.fieldName}
          color={props.fieldName === 'Origin' ? '#e53e3e' : '#38a169'} // These color values must be kept in sync with rest of the App
          position={position ? {
            lat: position.lat,
            lng: position.lon
          } : undefined}
          setPosition={newMarkerPosition} />
      </div>

      {display && (
        <div className='absolute z-20 left-0 mt-1 py-1 rounded-sm bg-white select-none'>
          {options.map((v, i) => {
            return (
              <div
                onMouseDownCapture={() => setAddressLabel(v.label, v.coordinates)}
                tabIndex={0}
                key={i}
                className='bg-white rounded-lg p-1 w-65'
              >
                <span
                  className='bg-white block border-white px-2 py-1 hover:border-white hover:bg-indigo-500 hover:text-white'
                  key={i}
                >
                  {v.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default Location;
