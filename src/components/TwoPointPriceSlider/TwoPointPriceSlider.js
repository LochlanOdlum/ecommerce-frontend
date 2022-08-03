import React, { useState, useEffect } from 'react';
import TwoPointSlider from '../TwoPointSlider';

import './TwoPointPriceSlider.scss';

//Purpose of component is to display values of slider instantly as prices, but debounce the change for any other components to use
const TwoPointPriceSlider = ({ setMinVal, setMaxVal, min, max, initialMin, initialMax }) => {
  const [bouncyMinVal, setBouncyMinVal] = useState(initialMin);
  const [bouncyMaxVal, setBouncyMaxVal] = useState(initialMax);

  //Effect to debounce the min and max values for any parent component to use
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMinVal(bouncyMinVal);
      setMaxVal(Math.ceil(bouncyMaxVal));
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <>
      <div className='shop-price-slider-prices'>
        <div>£{bouncyMinVal}</div>
        <div className='shop-price-filter-maxprice'>£{Math.ceil(bouncyMaxVal)}</div>
      </div>
      <TwoPointSlider
        bouncyMaxVal={bouncyMaxVal}
        bouncyMinVal={bouncyMinVal}
        setbouncyMinVal={setBouncyMinVal}
        setbouncyMaxVal={setBouncyMaxVal}
        min={min}
        max={max}
      />
    </>
  );
};

export default TwoPointPriceSlider;
