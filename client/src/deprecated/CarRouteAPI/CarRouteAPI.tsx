/* eslint-disable react/prop-types */
import React from 'react';

interface IPoint {
  pointA: string;
  pointB: string;
  submitQueryHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  getPointAValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
  getPointBValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CarRouteAPI: React.FC<IPoint> = props => {
  const { pointA, pointB, submitQueryHandler, getPointAValue, getPointBValue } = props;

  return (
    <div>
      <form onSubmit={submitQueryHandler} style={{display: 'flex'}}>
        <div>
          <label htmlFor="pointA">PointA
             <input type="text" value={pointA} onChange={getPointAValue} id="pointA"/>
          </label>
        </div>
        <div>
          <label htmlFor="pointB">
            <input type="text" value={pointB} onChange={getPointBValue} id="pointB"/>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarRouteAPI;

