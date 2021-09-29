import RoutesSelector from './AllRoutesWrapper';
import React, { useEffect, useRef, useState } from 'react';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';
import CarSetup from './CarSetup';
import Comparison from './Comparison';
import RouteFetch from './RouteFetch';
import L from 'leaflet';

// Available iocons easyly searched for in https://material.io/resources/icons/?style=baseline
const MainNav: React.FC = () => {
  // Prevents the map from hogging all the clicks
  const uiRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (uiRef.current) {
      L.DomEvent.disableClickPropagation(uiRef.current);
      L.DomEvent.disableScrollPropagation(uiRef.current);
    }
  }, []);

  const sideBaseStyle =
    'absolute pt-12 inset-y-0 left-0 bg-gray-200 w-64 h-full shadow transition duration-500 ease-in-out cursor-auto pointer-events-auto transform ';
  const xTranslation = ' -translate-x-64';

  const [sideBarStyle, setSidebarStyle] = useState(sideBaseStyle);
  const [sideBarStatus, setSidebarStatus] = useState(false);

  const comparsionBaseStyle =
    'md:ml-64 transition duration-500 ease-in-out transform ';
  const YTranslation = 'md:-translate-y-64 translate-y-64';

  const [comparisonStyle, setComparisonStyle] = useState(
    comparsionBaseStyle + YTranslation
  );
  const [comparisonStatus, setComparisonStatus] = useState(true);

  const carBaseStyle =
    'md:ml-56 transition duration-500 ease-in-out transform ';
  const negativeYTranslation = '-translate-y-64';

  const [carStyle, setCarStyle] = useState(carBaseStyle + negativeYTranslation);
  const [carStatus, setCarStatus] = useState(true);

  function translateSideBar() {
    if (sideBarStatus) setSidebarStyle(sideBaseStyle);
    else setSidebarStyle(sideBaseStyle + xTranslation);
    setSidebarStatus(!sideBarStatus);
  }

  function comparisonBtn() {
    if (comparisonStatus) setComparisonStyle(comparsionBaseStyle);
    else setComparisonStyle(comparsionBaseStyle + YTranslation);
    setComparisonStatus(!comparisonStatus);
  }

  function carBtn() {
    if (carStatus) setCarStyle(carBaseStyle);
    else setCarStyle(carBaseStyle + negativeYTranslation);
    setCarStatus(!carStatus);
  }

  const [carSetupStatus, setcarSetupStatus] = useState(false);
  const [fuelEco, setFuelEco] = useState<number>(0);
  const [tankSize, setTankSize] = useState<number>(0);
  const [fuelPrice, setfuelPrice] = useState<number>(0);

  useEffect(() => {
    carSetupIcon();
  }, [fuelEco, tankSize, fuelPrice]);

  function carSetupIcon() {
    if (fuelEco > 0 && tankSize > 0 && fuelPrice > 0) {
      setcarSetupStatus(true);
    } else setcarSetupStatus(false);
  }

  return (
    <div
      className='grid h-screen w-screen absolute z-1000 pointer-events-none'
      ref={uiRef}
    >
      <div className='bg-blue-500 rounded-br-lg h-12 md:z-50 z-10 w-64 absolute top-0 left-0 font-bold p-2 text-white cursor-auto select-none pointer-events-auto'>
        <img className='object-contain h-8' draggable='false' src='../magenta_logo.png' />
      </div>
      <div className={sideBarStyle}>
        <div className='absolute pt-10 inset-y-0 left-0 h-full transform translate-x-64 flex items-stretch'>
          <button
            onClick={() => translateSideBar()}
            className='w-5 h-10 bg-white rounded-r shadow right-0 self-center flex-1
          transition duration-500 ease-in-out material-icons z-10
          transform hover:scale-x-125 focus:outline-none'
          >
            {sideBarStatus ? 'chevron_right' : 'chevron_left'}
          </button>
        </div>

        <div className='p-2 bg-white text-gray-800 pointer-events-auto overflow-auto h-full md:pb-0 pb-48'>
          <RouteFetch />
          <RoutesSelector />
        </div>
      </div>

      <div className='w-full'>
        <div
          className='md:z-30 h-12 absolute md:bg-blue-500 md:flex md:flex-row-reverse md:justify-between 
                              md:pl-64 md:w-screen right-0 md:p-0 md:px-3 p-2 cursor-auto pointer-events-auto'
        >
          {/* <div className='md:mt-1 mt-2'>
             <button
              className='bg-blue-500 focus:outline-none transition duration-500 ease-in-out
                              rounded w-fit
                              material-icons text-white hover:text-blue-300 transform hover:scale-90 md-36'
            >
              menu

            </button> 
          </div> */}

          {/* this is here to space out the area where the menu goes normally */}
          <span></span>


          <div className='md:mt-1 mt-2'>
            <button
              onClick={comparisonBtn}
              className='bg-blue-500 focus:outline-none transition duration-500 ease-in-out
                                                        rounded w-fit
                                                        material-icons text-white hover:text-blue-300 transform hover:scale-90 md-36'
            >
              compare_arrows
            </button>
          </div>

          <div className='md:ml-12 md:mt-1 mt-2'>
            <button
              onClick={carBtn}
              className='bg-blue-500 focus:outline-none transition duration-500 ease-in-out
                                                rounded w-fit
                                                material-icons text-white hover:text-blue-300 transform hover:scale-90 md-36'
            >
              directions_car
              {carSetupStatus ? (
                <span
                  className='md:mt-1 md:-ml-5 absolute w-6 top-0 -m-2 rounded-full bg-blue-500 inset-x-0
                material-icons overflow-hidden text-green-400 md-24'
                >
                  check_circle_outline
                </span>
              ) : (
                <span
                  className='md:mt-1 md:-ml-5 absolute w-6 top-0 -m-2 rounded-full bg-blue-500 inset-x-0
                material-icons overflow-hidden text-yellow-400 md-24'
                >
                  error_outline
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* full width aligment container */}
      <div className='md:absolute z-20 md:mt-12 md:pl-16 md:bottom-auto w-full fixed bottom-0 pointer-events-none cursor-auto'>
        {' '}
        {/* pointer-events-none very importatn as this container covers part of the side bar*/}
        {/* drawer */}
        <div className={comparisonStyle}>
          <div className='md:h-58 shadow bg-white md:mx-auto md:rounded-none h-40 md:w-96 w-full rounded-b pointer-events-auto text-center'>
            <Comparison
              fuelEco={[fuelEco, setFuelEco]}
              tank={[tankSize, setTankSize]}
              fuelPrice={[fuelPrice, setfuelPrice]}
            />
          </div>
        </div>
      </div>

      {/* full width aligment container */}
      <div className='absolute md:z-20 z-40 w-full md:mt-12 no pointer-events-none cursor-auto'>
        {' '}
        {/* pointer-events-none very importatn as this container covers part of the side bar*/}
        {/* drawer */}
        <div className={carStyle}>
          <div className='md:h-58 shadow bg-white w-56 md:ml-10 md:mr-auto md:relative absolute right-0 mr-16 md:rounded-none h-40 rounded-b pointer-events-auto'>
            <CarSetup
              fuelEco={[fuelEco, setFuelEco]}
              tank={[tankSize, setTankSize]}
              fuelPrice={[fuelPrice, setfuelPrice]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
