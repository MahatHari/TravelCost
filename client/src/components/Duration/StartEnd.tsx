import React from 'react';
import ReactTooltip from 'react-tooltip';
import { IItinerary } from '../AllRoutesWrapper';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const Start: React.FC<IItinerary> = (props: IItinerary) => { 

  const {time, place} = props;
  const TooltipID = 'someStartID' + time + place;


  let starEndIcon;
  if (place == 'Origin') {
    starEndIcon = <i className="self-center material-icons md-36 overflow-hidden text-red-600">location_on</i>;
  } else {
    starEndIcon = <i className="self-center material-icons md-36 overflow-hidden text-green-600">location_on</i>;
  }

  return (
    <div className="flex my-1">

      <div className="w-1/6">
        <h4 className="w-full font-bold">{time}</h4>
      </div>
      
      <div className="w-1/6 flex flex-col">
        {starEndIcon}
      </div>

      <div className="w-3/6">
        <div data-tip data-for={TooltipID} className="truncate font-semibold">{place}</div>
        <ReactTooltip id={TooltipID} place="right" type="light" effect="solid">
            <div className="font-semibold">{place}</div>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default Start;