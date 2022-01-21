import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';

import './index.css';

let thumbsize = 14;

const TwoPointSlider = ({ minVal, setMinVal, maxVal, setMaxVal, min, max }) => {
  const [avg, setAvg] = useState((min + max) / 2);
  const [width, setWidth] = useState(0);
  const minMaxSlider = useRef(null);
  // const [minVal, setMinVal] = useState(min);
  // const [maxVal, setMaxVal] = useState(max);

  const minWidth = thumbsize + ((avg - min) / (max - min)) * (width - 2 * thumbsize);
  const minPercent = ((minVal - min) / (avg - min)) * 100;
  const maxPercent = ((maxVal - avg) / (max - avg)) * 100;
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

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (!minMaxSlider.current) {
        return;
      }
      setWidth(minMaxSlider.current.parentElement.getBoundingClientRect().width);
    });
  }, []);

  useLayoutEffect(() => {
    console.log('test');
    // console.log(minMaxSlider.current.parentElement.getBoundingClientRect().width);
    setWidth(minMaxSlider.current.parentElement.getBoundingClientRect().width);
  }, []);

  useLayoutEffect(() => {
    setAvg((maxVal + minVal) / 2);
  }, [minVal, maxVal]);

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
        value={minVal}
        onChange={({ target }) => setMinVal(Number(target.value))}
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
        value={maxVal}
        onChange={({ target }) => setMaxVal(Number(target.value))}
      />
    </div>
  );
};

export default TwoPointSlider;
