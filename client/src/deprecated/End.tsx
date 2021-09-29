import React from 'react';
import ReactTooltip from 'react-tooltip';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const End: React.FC = () => { 
  const d = new Date();
  const TooltipID = 'someStartIDprop';
  return (
    <div className="flex my-1">

      <div className="w-2/6">
        <h4 className="w-full font-medium">{`${d.getHours()} : ${d.getMinutes()}`}</h4>
      </div>
      
      <div className="w-1/6 flex flex-col">
        <i className="self-center material-icons md-36 overflow-hidden text-green-600">location_on</i>  
      </div>

      <div className="w-3/6">
        <div data-tip data-for={TooltipID} className="truncate font-semibold">Turku, Finland</div>
        <ReactTooltip id={TooltipID} place="right" type="light" effect="solid">
            <div className="font-semibold">Turku, Finland</div>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default End;


