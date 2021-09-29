import React, { useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { ModeIcon, ModeColor } from '../TransitTypes';
import { ILeg } from '../AllRoutesWrapper';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';
import { ResponseContext } from '../ResponseContext';


const Leg: React.FC<ILeg> = (props: ILeg) => { 
  const { prices, updatePrice } = useContext(ResponseContext);

  const dots = 5;
  const dotsArray = [];

  const {time, agency, mode, distance} = props;
  const color = ModeColor[mode];

  const TooltipID = 'someLegIDprop' + time + mode + distance;
 
  for (let index = 0; index < dots; index++) {
    dotsArray.push( <div key={'legDot'+index} className=" overflow-hidden self-center rounded-full bg-gray-600 w-2 h-2 mb-1 transform"></div>);
  }

  return (
    <div className="flex flex-row h-16 my-1">
      <div className="w-1/6 text-center flex items-stretch">
        <i className={'self-center flex-1 material-icons md-36 overflow-hidden text-'+color}>{ModeIcon[mode]}</i> 
      </div>

      {mode == 'WALK' ?  
        <div className="w-1/6 flex flex-col h-16 self-center">
          {dotsArray}
        </div>
      : <div className="w-1/6 flex flex-col h-16">
          <div className={'self-center w-2 h-48 transform scale-x-75 bg-'+color}></div>
        </div>}

      <div  data-tip data-for={TooltipID} className="flex items-stretch w-4/6">
        <div  className="self-center w-full">
          {agency ? 
            <>
             <div className="border-rounded p-1 m-1 text-xs text-CAR shadow-sm">
             <div className="truncate w-full">{agency}</div>
            <input
            value={prices[props.id.itin][props.id.leg].price.toFixed(2)}
            onChange={(event) => updatePrice(props.id.itin, props.id.leg, Number(event.target.value))}
            className={` appearance-none border-b-2 border-blue-500 w-3/5 text-center mr-1
            ${prices[props.id.itin][props.id.leg].estimate ? 'text-orange-600' : 'text-blue-500'} 
            font-bold leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
            placeholder="0.00" step=".1" type='number'  min="0"/>€
             
             </div>
             <ReactTooltip id={TooltipID} place="right" type="light" effect="solid">
                <div className="font-semibold">{agency}</div>
            </ReactTooltip>
            </>
          :
            <></>
          }
     
         
          {mode == 'WALK' ? 
            <div className="font-bold text-xs p-1">Walk {distance.toFixed(2)}km</div>
          :
            <div className="font-bold text-xs p-1">Travel {distance.toFixed(2)}km</div>
          }
  
        </div>
      </div>

    </div>
  );
};

export default Leg;
