import React, { useContext, useEffect, useState } from 'react';
import { ResponseContext } from './ResponseContext';
import { ICarSetup } from './CarSetup';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';

export function timeConvert(n: number): string {
  const num = n;
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  let hourTex = '';
  let minuteTex = '';

  if (rhours == 1) {
    hourTex = rhours + ' hour ';
  } else if (rhours > 1) {
    hourTex =  rhours +' hours ';
  }

  if (rminutes == 1) {
    minuteTex = ' minute ';
  } else if (rminutes > 1) {
    minuteTex =  ' minutes ';
  }

  return  hourTex + rminutes + minuteTex;
}

const Comparison: React.FC<ICarSetup> = (props: ICarSetup) => {
  const {current, currentPrice} = useContext(ResponseContext);
  const {fuelEco, tank, fuelPrice} = props;
  const [price, setPrice] = useState(0);
  

  const [fuelCost, setFuelCost] = useState(0);
  const [carDistance, setCarDistance] = useState(0);
  const [carDuration, setCarDuration] = useState(0);
  const [totalFuel, setTotalFuel] =  useState(0);
  const [reFills, setReFills] =  useState('');

  const [pubDuration, setPubDuration] = useState(0);
  const [pubDistance, setPubDistance] = useState(0);
  const [walkingDistance, setWalkingDistance]  = useState(0);
  const [transfers, setTransfers]  = useState(0);
  const [setupMessageCar, setSetupMessageCar ]= useState('');
  const [setupMessagePub, setSetupMessagePub ]= useState('');

  

  useEffect(() => {
    (async () => {
      if (currentPrice) {
        setPrice(currentPrice.price);
      }
      })();
      compCalc();
  }, [currentPrice, current, fuelEco, tank, fuelPrice, price]);
 
      
  function compCalc () {
    setSetupMessageCar('');
    setSetupMessagePub('');
    let tempMsg = '';
    if (current?.carDf?.distance && current?.carDf?.duration){
      setCarDistance(current.carDf.distance / 1000);
      setFuelCost(carDistance * fuelEco[0] * fuelPrice[0] /100);
      setCarDuration(current.carDf.duration /60);
      setTotalFuel(carDistance * fuelEco[0] /100);
      
      if (tank[0] > totalFuel){
        setReFills('0');
      }
      else {
        const refillCount = Math.ceil( totalFuel / tank[0] );
        setReFills(refillCount.toString());
      }
    }else {
      tempMsg = ('- Please select a\n orign and destination.\n');
    }
    if (!fuelPrice[0]  || !fuelEco[0] || !tank[0] ) {
      tempMsg = tempMsg + '\n- Setup your car';
    }
    setSetupMessageCar(tempMsg);
    
    if (current?.pubDf?.legs && current?.pubDf?.duration){
      setPubDuration(current.pubDf.duration / 60); 
      let tempPubDistance = 0;
      current.pubDf.legs.forEach(legs => tempPubDistance = tempPubDistance + legs.distance);
    
      setPubDistance(tempPubDistance / 1000);
      setWalkingDistance(current.pubDf.walkDistance / 1000);
      setTransfers(current.pubDf.legs.length - 2);
    }else{
      setSetupMessagePub('- Please select a\n orign and destination.\n\n- Accuracy can be improved by manually adjusting individual fair prices');
    }  
  }
   
  return (
    <div className='flex pt-3 h-full p-1 font-semibold'>
        <div className='w-1/2'>
        <div className='text-lg text-blue-500 font-bold mb-2'>Personal vehicle</div>

        {setupMessageCar ? 
          <div className='flex text-center'>
            <span className='m-auto text-gray-600 whitespace-pre-wrap'>{setupMessageCar}</span>
          </div>
          :
          <>
            <p className={`box ${carDistance > pubDistance ? 'text-red-600' : 'text-green-600'}`} >
              Distance: {carDistance.toFixed(2)} km
            </p>
            <p className={`box ${carDuration > pubDuration ? 'text-red-600' : 'text-green-600'}`} >
              Time: {timeConvert(carDuration)} 
            </p>
            <p className={`box ${price < fuelCost ? 'text-red-600' : 'text-green-600'}`}>
              Fuel cost: {fuelCost.toFixed(2)} €
            </p>
            <p>
              Refills: {reFills}
            </p>
            <p>
              Total needed fuel: {totalFuel.toFixed(2)} l
            </p>
          </>
        }

        </div>
        <div className='bg-blue-500 w-1 my-2 transform scale-x-75'/>
        <div className='w-1/2'>
        <div className='text-lg text-purple-500 font-bold mb-2'>Public transit</div>
        {setupMessagePub ? 
          <div className='flex text-center'>
            <span className='m-auto text-gray-600 whitespace-pre-wrap'>{setupMessagePub}</span>
          </div>
          :
          <>
            <p className={`box ${carDistance < pubDuration ? 'text-red-600' : 'text-green-600'}`} >
              Distance: {pubDistance.toFixed(2)} km
            </p>
            <p className={`box ${carDuration < pubDuration ? 'text-red-600' : 'text-green-600'}`} >
              Time: {timeConvert(pubDuration)}
            </p>
            <p className={`box ${price > fuelCost ? 'text-red-600' : 'text-green-600'}`} >
              Fare cost: {price.toFixed(2)} €
            </p>
            <p>
              Transfers: {transfers}
            </p>
            <p>
              Walking: {walkingDistance.toFixed(2)} km
            </p>
          </>
        }

        </div>
    </div>
  );
};

export default Comparison;