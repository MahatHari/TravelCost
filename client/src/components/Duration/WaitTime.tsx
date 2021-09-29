import React from 'react';
import { IItinerary } from '../AllRoutesWrapper';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';

const DateIconLoc: React.FC<IItinerary> = (props: IItinerary) => { 
  const {time} = props;
  return (
    <div className="flex my-1">
      <div className="w-1/6">
        <h4 className="ml-1 w-full"></h4>
      </div>

      <div className="w-1/6 flex flex-col">
        <div className="self-center rounded-full bg-white w-4 h-4 border-solid border-4 border-orange-400"></div>
      </div>

      <div   className="w-4/6">
       <div className="truncate"> Wait {time}</div>
      </div>
    </div>
  );
};

export default DateIconLoc;