import React from 'react';

import './AdminSummaryWidget.css';

console.log('aaaaaaaaaaaaaaaaa');

const AdminSummaryWidget = ({ heading, subheading, value }) => {
  return (
    <div className='admin-widget card'>
      <div className='admin-widget-content'>
        <div className='admin-widget-content-left'>
          <div className='admin-widget-content-heading'>{heading}</div>
          <div className='admin-widget-content-subheading'>{subheading}</div>
        </div>
        <div className='admin-widget-content-right'>{value}</div>
      </div>
    </div>
  );
};

export default AdminSummaryWidget;
