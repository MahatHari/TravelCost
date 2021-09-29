export const graphQLRequest = `query Itinaries($from: InputCoordinates, $to: InputCoordinates, $date: String, $time: String, $modes: [TransportMode])
      {plan(from: $from, to: $to, date: $date, time: $time, transportModes: $modes) { 
        itineraries {
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