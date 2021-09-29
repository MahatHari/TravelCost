import React from 'react';
import ReactTooltip from 'react-tooltip';
import { IItinerary } from '../AllRoutesWrapper';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const DateIconLoc: React.FC<IItinerary> = (props: IItinerary) => { 
  const {time, place} = props;
  const palceTooltipID = 'someLocIDprop' + time + place;
  return (
    <div className="flex my-1">
      <div className="w-1/6">
        <h4 className="ml-1 w-full">{time}</h4>
      </div>

      <div className="w-1/6 flex flex-col">
        <div className="self-center rounded-full bg-white w-4 h-4 border-solid border-4 border-gray-400"></div>
      </div>

      <div   data-tip data-for={palceTooltipID} className="w-4/6">
       <div className="truncate">{place}</div>
       <ReactTooltip id={palceTooltipID} place="right" type="light" effect="solid">
              <div className="font-semibold">{place}</div>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default DateIconLoc;