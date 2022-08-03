import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';

import './TwoPointSlider.scss';

let thumbsize = 14;

const TwoPointSlider = ({ bouncyMinVal, setbouncyMinVal, bouncyMaxVal, setbouncyMaxVal, min, max }) => {
  const [avg, setAvg] = useState((min + max) / 2);
  const [width, setWidth] = useState(0);
  const minMaxSlider = useRef(null);

  const minWidth = thumbsize + ((avg - min) / (max - min)) * (width - 2 * thumbsize);
  const minPercent = ((bouncyMinVal - min) / (avg - min)) * 100;
  const maxPercent = ((bouncyMaxVal - avg) / (max - avg)) * 100;
  const styles = {
    min: {
      width: minWidth,
      left: 0,
      '--minRangePercent': `${minPercent}%`,
    },
    max: {
      width: thumbsize + ((max - avg) / (max - min)) * (width - 2 * thumbsize),
      left: minWidth,
      '--maxRangePercent': `${maxPercent}%`,
    },
  };

  //This keeps the width of the component to the same as its parent container.
  useEffect(() => {
    const resize = () => {
      if (!minMaxSlider.current) {
        return;
      }
      setWidth(minMaxSlider.current.parentElement.getBoundingClientRect().width);
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useLayoutEffect(() => {
    console.log('test');
    // console.log(minMaxSlider.current.parentElement.getBoundingClientRect().width);
    setWidth(minMaxSlider.current.parentElement.getBoundingClientRect().width);
  }, []);

  useLayoutEffect(() => {
    setAvg((bouncyMaxVal + bouncyMinVal) / 2);
  }, [bouncyMinVal, bouncyMaxVal]);

  return (
    <div
      className='min-max-slider'
      ref={minMaxSlider}
      data-legendnum='2'
      data-rangemin={min}
      data-rangemax={max}
      data-thumbsize={thumbsize}
      data-rangewidth={width}
    >
      <label htmlFor='min'>Minimum price</label>
      <input
        id='min'
        className='min'
        style={styles.min}
        name='min'
        type='range'
        step='1'
        min={min}
        max={avg}
        value={bouncyMinVal}
        onChange={({ target }) => setbouncyMinVal(Number(target.value))}
      />
      <label htmlFor='max'>Maximum price</label>
      <input
        id='max'
        className='max'
        style={styles.max}
        name='max'
        type='range'
        step='1'
        min={avg}
        max={max}
        value={bouncyMaxVal}
        onChange={({ target }) => setbouncyMaxVal(Number(target.value))}
      />
    </div>
  );
};

export default TwoPointSlider;
