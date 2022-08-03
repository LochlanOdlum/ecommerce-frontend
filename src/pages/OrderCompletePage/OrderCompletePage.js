import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '../../actions/orderActions';
import { useDispatch } from 'react-redux';
import useOrders from '../../hooks/useOrders';
import { Link } from 'react-router-dom';

import { downloadImage } from '../../api/ordersApi';
import ImageDownload from '../../components/ImageDownload/ImageDownload';
import MailingList from '../../components/MailingList/MailingList';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';

import './OrderCompletePage.scss';

const OrderCompletePage = () => {
  const { orders } = useOrders();
  const orderId = useParams().orderId;
  const dispatch = useDispatch();

  const order = orders?.find((order) => order.id === +orderId);

  const handleImageDownloadClick = (s3ImagesKey) => {
    downloadImage(s3ImagesKey);
  };

  const handleDownloadAllClick = () => {
    order.orderItems.forEach((orderItem, index) => {
      setTimeout(() => {
        downloadImage(orderItem.s3ImagesKey);
      }, index * 100);
    });
  };

  useEffect(() => {
    dispatch(fetchOrder(orderId));

    // eslint-disable-next-line
  }, [orderId]);

  const renderOrderItemsList = () => {
    return order.orderItems.map((orderItem) => {
      return (
        <div key={orderItem.id} className='oc-orderItem'>
          <div className='oc-orderItem-img-container'>
            <ImageDownload paddingBottom={'100%'} endpoint={`/photoMedCropped2to1/${orderItem.s3ImagesKey}`} />
          </div>
          <div className='oc-orderItem-title'>{orderItem.title}</div>
          <img
            className='oc-download-image-button'
            onClick={() => handleImageDownloadClick(orderItem.s3ImagesKey)}
            src='/images/download-icon-grey.svg'
            alt='download img icon'
          />
        </div>
      );
    });
  };

  return (
    <>
      <NavBar />
      <div>
        <div className='oc-page'>
          <div className='oc-page-inner'>
            <img className='oc-order-success-tick' src='/images/order-success-tick.svg' alt='order succcess tick' />
            <div className='oc-order-thank-you text-center'>
              Thank you for your <br /> Order!
            </div>
            <div className='oc-text-desc text-center'>
              Your photos are available for download at any time on the My Photos page of your account. Also feel free
              to download your photos below.
            </div>
            <div className='oc-nav-buttons-container'>
              <Link to='/myphotos' className='button-orange oc-nav-button'>
                My Photos
              </Link>
              <Link to='/shop' className='button-cadet oc-nav-button'>
                Continue Shopping
              </Link>
            </div>

            {order && (
              <div className='oc-orderItems-container'>
                <div className='oc-download-all-button' onClick={handleDownloadAllClick}>
                  Download All
                </div>
                <div className='oc-orderItems'>{renderOrderItemsList()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <MailingList />
      <Footer />
    </>
  );
};

export default OrderCompletePage;
