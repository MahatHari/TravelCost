/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Constants from '../constants';
import moment from 'moment';
interface IAgency {
  gtfsId: string;
  name: string;
}
interface ILegGeometry {
  length: number;
  points: string;
}
interface IStop {
  code: string;
  name: string;
}
interface IToLocation {
  lat: number;
  lon: number;
  name: string;
}
interface IFromLocation extends IToLocation {
  stop: IStop | null;
}
interface ILeg {
  mode:
    | 'WALK'
    | 'BUS'
    | 'TRAM'
    | 'CAR'
    | 'BICYCLE'
    | 'SUBWAY'
    | 'TRAIN'
    | 'FERRY'
    | 'TRANSIT';
  startTime: number;
  endTime: number;
  from: IFromLocation;
  to: IToLocation;
  agency: IAgency | null;
  distance: number;
  legGeometry: ILegGeometry;
}

interface IItinerary {
  walkDistance: number;
  duration: number;
  legs: ILeg[];
}
interface IData {
  plan: {
    itineraries: IItinerary[];
  };
}

const GetItneary = (props: { from: string; to: string }): JSX.Element => {
  console.log(props.from);
  console.log(props);
  const now = moment().format('YYYY-MM-DD');
  const hour = moment().format('h:mm:ss');

  // eslint-disable-next-line
  const [itenary, setItenary] = useState<IData>();
  const [leg, setLeg] = useState<Array<ILeg[]>>([]);
  const query = `{plan( fromPlace: "${props.from}", toPlace: "${props.to}", date:"${now}", time:" ${hour}"
  ) {
    itineraries{
      walkDistance,
      duration,
      legs {
        mode
        startTime
        endTime
        from {
          lat
          lon
          name
          stop {
            code
            name
          }
        },
        to {
          lat
          lon
          name
        },
        agency {
          gtfsId
	  			name
        },
        distance
        legGeometry {
          length
          points
        }
      }
    }
  }
}`;

  useEffect(() => {
    //calling graphQLAPI
    axios
      .post(Constants.URL_API, query, {
        headers: {
          'Content-Type': 'application/graphql',
        },
      })
      .then((response: { data: { data: IData } }) => {
        const result: IData = response.data.data;
        const plans = result.plan;
        const iti = plans.itineraries;
        //Console logs data to get ussage

        console.log('plan=>', plans);
        console.log('Itenaries=>', plans.itineraries);

        console.log('Walking distance =>', iti[0].walkDistance);
        //setting state of Itenaries
        //Can use only one state, by the following line,
        setItenary(result);
        const testLeg = response.data.data?.plan.itineraries.map(
          (b: IItinerary) => b.legs
        );

        console.log('TestLeg => ', testLeg);
        //const legs = itenary?.plan.itineraries.map((a) => a.legs);
        setLeg(testLeg !== undefined ? testLeg : []);
      });
  }, [query]);
  return (
    <div>
      Itenary Details
      <div>
        {leg.map((eachleg, i) => (
          <>
            Legs:{i + 1}
            {eachleg.map((property) => (
              // eslint-disable-next-line react/jsx-key
              <ul>
                <li key={property.startTime}>
                  {' '}
                  Means of Travel :{property.mode} <br></br>
                  Distance: {property.distance}
                  <br></br>
                  Start Time : {property.startTime} <br></br>
                  End Time : {property.endTime} <br></br>
                  Calculated Duration : {property.endTime -
                    property.startTime}{' '}
                  <br></br>
                  From:{property.from.name} Coordinates= Latitude:
                  {property.from.lat} Longitutde : {property.from.lon}
                  <br></br>
                  To: {property.to.name} Coordinates= Latitude:
                  {property.to.lat} Longitutde : {property.to.lon} <br></br>
                  Leg Geometry Points {property.legGeometry.points}
                </li>
              </ul>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default GetItneary;
