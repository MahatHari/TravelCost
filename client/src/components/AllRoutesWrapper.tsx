import React, { useContext, useEffect, useState } from 'react';
import Leg from './LegRoutes/Leg';
import StartEnd from './Duration/StartEnd';
import DateIconLoc from './Duration/DateIconLoc';
import WaitTime from './Duration/WaitTime';
import { TransitMode} from './TransitTypes';
import { ResponseContext } from './ResponseContext';
import { timeConvert } from './Comparison';

import '../../node_modules/material-design-icons/iconfont/material-icons.css';

export interface IItinerary {
  time:  string,
  place: string,
}

export interface ILeg {
  time:  string,
  agency: string,
  distance: number,
  mode: TransitMode,
  id: {
    itin: number, 
    leg: number
  }
}

const options = {
 // weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  hour: 'numeric', minute: 'numeric',
  hour12: false,
};

const RoutesSelector: React.FC = () => {

  const { parsed } = useContext(ResponseContext);
  const routes: JSX.Element[] = [];

  parsed?.pubItins.forEach((itin, index) =>{
    routes.push(<RoutesWrapper key={index+'Routes'} index={index} />);
  });

  return (
    <>
      {routes}      
    </>
  );

};

interface IRoutesWrapper {
  index: number
 // legs: ILeg[]
}

const RoutesWrapper: React.FC<IRoutesWrapper>  = (props: IRoutesWrapper ) => {
   // Currently selected routes, updates any time a new itinerary is selected.
  
  const { currentPubItin, parsed, setCurrentPubItin, prices } = useContext(ResponseContext);
 
  if (!parsed) return (<></>);
  const currentLegs = parsed.pubItins[props.index].legs;
  const showRouteDef = true;
  const showRouteCSSDef = 'h-0 ';
  const selectedDef = ' bg-blue-500 ';
  // This will set the first route expandeded on load but IMO its better to just leave all closed
  // if (props.index <= 0){
  //   showRouteDef = false;
  //   showRouteCSSDef = 'h-auto';
  //   selectedDef = ' bg-blue-700 ';
  // }
  const [showRoute, setShowRoute] = useState(showRouteDef);
  const [showRouteCSS, setShowRouteCSS] = useState(showRouteCSSDef);

  
  const [selected, setSelected] = useState(selectedDef);

  function routeToggle() {    
    if(showRoute) setShowRouteCSS(' h-auto ');
    else setShowRouteCSS(' h-0 ');

    setShowRoute(!showRoute);
  }

  function routeSelect() {    
    setCurrentPubItin(props.index);
  }

  useEffect(() => {
    if (currentPubItin === props.index) setSelected(' bg-blue-700 ');
    else  setSelected(' bg-blue-500 '); 
  });


  if (currentLegs){
    const startTime = new Date(currentLegs[0].startTime);
    const endTime = new Date(currentLegs[currentLegs.length-1].endTime);

    const legsArray: JSX.Element[] = [];
    currentLegs.forEach((legs, index) => {

      let agency = '';
      if (legs.agency?.name) agency = legs.agency?.name;
      const startTime = new Date(legs.startTime);

      legsArray.push(<Leg key={legs.mode + (legs.endTime-1)} id={{itin: props.index, leg: index}} time={startTime.toLocaleTimeString('en-US', options).toString()}
      agency={agency} distance={legs.distance / 1000} mode={legs.mode}/>);
           
      if (index < currentLegs.length-1) {     
        legsArray.push(<DateIconLoc key={legs.mode + legs.startTime}
          time={startTime.toLocaleTimeString('en-US', options).toString()} place={legs.from.name} />);
        const oldEndTime = new Date(currentLegs[index].endTime);
        const newStartTime = new Date(currentLegs[index+1].startTime);
        const legWaitTime: number = Math.abs(oldEndTime.getTime() - newStartTime.getTime());
        if (index < currentLegs.length-1 && (legWaitTime/60000) > 15) { 
            legsArray.push(<WaitTime key={legs.mode + legs.startTime + 'waitTime' + legs.endTime}
            time={timeConvert(legWaitTime/60000)} place={'no name'} />);
        }
      }
      
    });
  

    return (
      <div className='border-b-2 mb-2 cursor-default'>
        <div  className= {selected + 'flex w-full mt-1 transition duration-500 ease-in-out h-8 '}>
        {selected === ' bg-blue-700 ' ?  
          <div onClick={routeSelect} className='p-1 text-white font-bold transition duration-500 ease-in-out material-icons md-24'>radio_button_checked</div>
        : <div onClick={routeSelect} className='p-1 text-white font-bold transition duration-500 ease-in-out material-icons md-24'>radio_button_unchecked</div>}

    <div className='p-1 m-auto text-lg text-white font-semibold'>
      Route {props.index + 1}: {prices[props.index].reduce((acc, val) => {return acc+val.price;}, 0).toFixed(2).toString().replace('.', ',')}€
    </div>
        
        {showRoute ?  
          <div onClick={routeToggle}
          className='ml-auto p-1 text-white material-icons md-24 border-l-2 border-blue-800 hover:bg-blue-700' >keyboard_arrow_down</div>
        : <div onClick={routeToggle}
          className='ml-auto p-1 text-white material-icons md-24 border-l-2 border-blue-800 hover:bg-blue-700' >keyboard_arrow_up</div>}
         
        </div> 
        
        <div className={showRouteCSS + 'overflow-hidden transition duration-500 ease-in-out'}> 
         
          <StartEnd key='from' time={startTime.toLocaleTimeString('en-US', options).toString()} place={currentLegs[0].from.name} />
          {legsArray}
          <StartEnd key='to' time={endTime.toLocaleTimeString('en-US', options).toString()} place={currentLegs[currentLegs.length-1].from.name} />
        </div>
      </div>
    );
  }else {
    return (
    <>
    </>
    );
  }

};

export default RoutesSelector;