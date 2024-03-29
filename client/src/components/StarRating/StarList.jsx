import React, { useContext } from 'react';
import { BodyReviewContext } from '../OrdersItem/OrdersItem';

import Star from './Star';

function StarsList() {
  const { maxValue } = useContext(BodyReviewContext);

  return (
    <div
      className='star-rating'
      style={{
        display: 'flex',
        width: '140px',
        justifyContent: 'space-between',
        marginBottom: '15px',
      }}
    >
      {[...Array(maxValue)].map((star, index) => {
        const value = index + 1;

        return <Star key={index} value={value} />;
      })}
    </div>
  );
}

export default StarsList;
