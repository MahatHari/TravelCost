import React from 'react';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';
// Available iocons easyly searched for in https://material.io/resources/icons/?style=baseline


export interface ICarSetup {
  fuelEco:    [number, React.Dispatch<React.SetStateAction<number>>]
  tank:       [number, React.Dispatch<React.SetStateAction<number>>]
  fuelPrice:  [number, React.Dispatch<React.SetStateAction<number>>]
}


const CarSetup: React.FC<ICarSetup> = (props: ICarSetup) => {

  const [fuelEco, setFuelEco]     = props.fuelEco;
  const [tankSize, setTankSize]   = props.tank;
  const [fuelPrice, setfuelPrice] = props.fuelPrice;

  return(
          <>
            <div className='p-1 flex items-stretch'>
              <span className='material-icons overflow-hidden text-blue-500 md-48'>directions_car</span>
              <span className='text-lg text-gray-700 font-bold mx-1 self-center flex-1 text-left border-b-2 border-blue-500'>
                Setup your car
              </span>
            </div>
            <form className='w-full mx-1 font-semibold'>
              <div className='transform translate-x-4'>
                <div  className='flex items-center pb-2'>
                    <div className='w-2/5  text-right'>
                      <label className='bloc'>Fuel economy</label>
                    </div>
                    <div className='w-1/5 mx-1'>
                      <input onChange={(event) => setFuelEco(parseFloat(event.target.value))} value={fuelEco}
                      className='bg-gray-200 appearance-none border-b-2 border-blue-500 w-full text-center text-purple-500 font-bold leading-tight focus:outline-none focus:bg-white focus:border-purple-500' placeholder="0.0" step=".1" type='number'  min="0"/>
                    </div>
                    <div className=''>
                      <label className='block'>l/100km</label>
                    </div>
                </div>

                <div  className='flex items-center pb-2'> 
                    <div className='w-2/5  text-right'>
                      <label className='block'>Fuel tank size</label>
                    </div>
                    <div className='w-1/5 mx-1'>
                      <input onChange={(event) => setTankSize(parseFloat(event.target.value))} value={tankSize}
                      className='bg-gray-200 appearance-none border-b-2 border-blue-500 w-full text-center text-purple-500 font-bold leading-tight focus:outline-none focus:bg-white focus:border-purple-500' placeholder="0" step="1" type='number'  min="0"/>
                    </div>
                    <div className=''>
                      <label className='block'>l</label>
                    </div>
                </div>
                  
                <div  className='flex items-center pb-2'>
                    <div className='w-2/5 text-right'>
                      <label className='block'>Fuel price</label>
                    </div>
                    <div className='w-1/5 mx-1'>
                      <input onChange={(event) => setfuelPrice(parseFloat(event.target.value))} value={fuelPrice}
                      className='bg-gray-200 appearance-none border-b-2 border-blue-500 w-full text-center text-purple-500 font-bold leading-tight focus:outline-none focus:bg-white focus:border-purple-500' placeholder="0.0" step=".1" type='number'  min="0"/>
                    </div>
                    <div className=''>
                      <label className='block'>€/l</label>
                    </div>
                </div>
              </div>
            </form>
          </>
  );
};

export default CarSetup;