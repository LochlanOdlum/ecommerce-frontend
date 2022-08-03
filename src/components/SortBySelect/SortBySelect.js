import React, { useState, useRef } from 'react';

import useOnClickOutsideElement from '../../hooks/useOnClickOutsideElement';

import './SortBySelect.scss';

const SortBySelect = ({ sortByOptions, activeSortBy, setActiveSortBy }) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectElementRef = useRef(null);
  useOnClickOutsideElement(selectElementRef, () => setIsSelectOpen(false));

  const renderSelectOptions = () => {
    return sortByOptions.map((option) => {
      const isActiveOption = option.id === activeSortBy.id;

      return (
        <div
          key={option.id}
          className='shop-sort-select-row'
          onClick={() => {
            setIsSelectOpen(false);
            setActiveSortBy(option);
          }}
        >
          <div className='shop-sort-select-row-tick-container'>
            {isActiveOption && <img src='/images/active-tick.svg' alt='active tick' />}
          </div>
          <div className='shop-sort-select-row-description'>{option.description}</div>
        </div>
      );
    });
  };

  return (
    <div className='shop-sort-by-contaner'>
      <button
        className='shop-sort-by-button'
        onClick={() => {
          setIsSelectOpen(true);
        }}
      >
        <div className='shop-sort-by-text'>Sort By: {activeSortBy.description.slice(0, 4)}...</div>

        <svg
          className='shop-sort-by-arrow'
          width='15'
          height='7'
          viewBox='0 0 15 7'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1.31714 0.299609C1.72031 0.117605 2.19299 0.191547 2.52133 0.487982L5.50846 3.18491C6.65044 4.21595 8.38728 4.21595 9.52925 3.18491L12.5164 0.487982C12.8447 0.191547 13.3174 0.117605 13.7206 0.299609C14.4524 0.629951 14.6045 1.60271 14.0086 2.14075L9.52925 6.18492C8.38728 7.21595 6.65044 7.21595 5.50846 6.18491L1.02912 2.14075C0.43319 1.60271 0.585362 0.629951 1.31714 0.299609Z'
            fill='#8D8A8A'
          />
        </svg>
      </button>
      {isSelectOpen && (
        <div className='sort-by-select' ref={selectElementRef}>
          {renderSelectOptions()}
        </div>
      )}
    </div>
  );
};

export default SortBySelect;
