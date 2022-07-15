import React from 'react';

import ImageDownload from '../ImageDownload';

import './AdminOrderDetailsModal.css';

const AdminOrderDetailsModal = ({ order, closeModal }) => {
  const [userCreationDate] = order.user.createdAt.split('.')[0].split('T');

  console.log(order);
  const renderOrderItems = () => {
    return order.orderItems.map((orderItem) => {
      return (
        <div key={orderItem.id} className='aodm-orderItem'>
          <div className='aodm-orderItem-image'>
            <ImageDownload
              paddingBottom={'100%'}
              endpoint={`photoMedCropped2to1/${orderItem.imageMedCropped2to1Key}`}
            />
          </div>
          <div className='aodm-oi-info-1'>
            <div className='aodm-oi-title'>{orderItem.title}</div>
            <div className='aodm-oi-price'>£{orderItem.priceInPence / 100}</div>
          </div>
          {/* <div className='aodm-oi-info-2'>{orderItem.title}</div> */}
        </div>
      );
    });
  };

  return (
    <div className='aodm'>
      <div className='aodm-header'>
        <div className='aodm-order-num'>{`Order #${order.id}`}</div>
        <div className='aodm-header-close-cross' onClick={closeModal}>
          {closeCross}
        </div>
      </div>
      <div className='aodm-content'>
        <div className='aodm-content-main'>
          <div className='aodm-content-left'>
            <div className='aodm-customer-info'>
              <div className='aodm-customer-title'>Customer</div>
              <div className='aodm-customer-data'>
                <div className='aodm-customer-data-row'>
                  <div className='aodm-customer-data-key'>Name:</div>
                  <div className='aodm-customer-data-value'>{order.user.name}</div>
                </div>
                <div className='aodm-customer-data-row'>
                  <div className='aodm-customer-data-key'>Email:</div>
                  <div className='aodm-customer-data-value'> {order.user.email}</div>
                </div>
                <div className='aodm-customer-data-row'>
                  <div className='aodm-customer-data-key'>Account Creation Date:</div>
                  <div className='aodm-customer-data-value'>{userCreationDate}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='aodm-seperator-bar' />
          <div className='aodm-content-right'>{renderOrderItems()}</div>
        </div>
        <div className='aodm-content-lower'>
          <div className='aodm-order-total'>Total: £{order.totalPriceInPence / 100}</div>
        </div>
      </div>
    </div>
  );
};

const closeCross = (
  <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='1.8501' width='35.9498' height='2.61625' rx='1.30812' transform='rotate(45 1.8501 0)' fill='#777777' />
    <rect y='25.4203' width='35.9498' height='2.61625' rx='1.30812' transform='rotate(-45 0 25.4203)' fill='#777777' />
  </svg>
);

export default AdminOrderDetailsModal;
