import React from 'react';

const ShopFilterItem = ({ title, isOpen, setIsOpen }) => {
  return (
    <div className="shop-filter-header">
      <div className="shop-filter-block-title">{title}</div>
      <div
        className="shop-filter-svg-container"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen && (
          <svg
            className="sp-filter-minus"
            width="15"
            height="3"
            viewBox="0 0 15 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.4453 1.875H1.44531"
              stroke="#8D8A8A"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        )}
        {!isOpen && (
          <svg
            className="sp-filter-plus"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 7H1"
              stroke="#8D8A8A"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M7 1L7 13"
              stroke="#8D8A8A"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ShopFilterItem;
