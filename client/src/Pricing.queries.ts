export const HSLQuery = ` query Itinaries($from: InputCoordinates, $to: InputCoordinates)
      {
          plan
          (from: $from, to: $to) 
          { 
            itineraries {
              fares{
                  cents
              }
            }
          }  
    }`;
