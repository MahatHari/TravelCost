import React, { useContext } from 'react';
import { ErrorContext } from './ErrorContext';
function Modal(): JSX.Element {
  const { display } = useContext(ErrorContext);
  return (
    <>
      {display ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full h-full'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
                <h2 className='text-3xl font-semibold'>Loading ....</h2>
              </div>
              <div className='relative p-6 flex-auto'>
                <div className='inline-block animate-pulse ease duration-50 w-5 h-5  rounded-full bg-blue-800 mx-2'></div>
                <div className='inline-block animate-pulse ease duration-50 w-5 h-5  rounded-full bg-blue-800 mx-2'></div>
                <div className='inline-block animate-pulse ease duration-50 w-5 h-5 rounded-full bg-blue-800 mx-2'></div>
                <div className='inline-block animate-pulse ease duration-50 w-5 h-5 rounded-full bg-blue-800 mx-2'></div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
