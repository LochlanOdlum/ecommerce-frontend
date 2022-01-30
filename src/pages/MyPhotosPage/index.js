import React, { useEffect, useState } from 'react';
import useOrders from '../../hooks/useOrders';
import NavBar from '../../components/NavBar';
import MailingList from '../../components/MailingList';
import Footer from '../../components/Footer';
import ordersApi from '../../api/ordersApi';

import './index.css';

const MyPhotosPage = () => {
  const { orders, orderItems, isLoading, error } = useOrders();
  const [photoURLs, setPhotoURLs] = useState({});

  //Purpose is to gather all photos and add them to photoURLs which maps orderitem id to the photo
  useEffect(() => {
    const getPhotos = async () => {
      if (!orderItems || !orderItems.length) {
        return;
      }

      const imageDownloadPromiseArray = [];
      const newPhotoUrls = {};

      orderItems.forEach((photo) => {
        imageDownloadPromiseArray.push(
          new Promise(async (resolve, reject) => {
            try {
              const objectURL = await ordersApi.fetchMedCropped2to1Image(photo.imageMedCropped2to1Key);
              newPhotoUrls[photo.id] = objectURL;
              resolve();
            } catch (error) {
              reject();
            }
          })
        );
      });

      await Promise.all(imageDownloadPromiseArray);
      setPhotoURLs(newPhotoUrls);
    };

    getPhotos();
  }, [orderItems]);

  const renderMyPhotos = () => {
    if (isLoading || !orders || !photoURLs) {
      return <div>Loading Photos!</div>;
    }

    if (error) {
      return <div>Error!</div>;
    }

    const photosList = [];

    orderItems.forEach((photo) => {
      photosList.push(
        <div className='mpp-photo-container' key={photo.id}>
          <div className='mpp-photo-img-container'>
            <div style={{ backgroundImage: `url('${photoURLs[photo.id]}')` }} className='mpp-photo-img' />
          </div>
          <div className='mpp-photo-content-right'>
            <div className='mpp-photo-info-grid'>
              <div className='mpp-photo-info-heading'>Name</div>
              <div className='mpp-photo-info-text  mpp-photo-name'>{photo.title}</div>

              <div className='mpp-photo-info-heading'>Date</div>
              <div className='mpp-photo-info-text'>{photo.createdAt.split('T')[0].split('-').reverse().join('/')}</div>

              <div className='mpp-photo-info-heading'>Status</div>
              <div className='mpp-photo-info-text'>Confirmed</div>

              <div className='mpp-photo-info-heading'>Total</div>
              <div className='mpp-photo-info-text'>£{photo.priceInPounds}</div>
            </div>
            <button className='orange-brown-button mpp-download-button'>
              Download
              <div className='mpp-download-icon'>{downloadIcon} </div>
            </button>
          </div>
        </div>
      );

      // photosList.push(<div className='mpp-photo-container'>
      //   {order.title}
      // </div>);
    });

    return photosList;
  };

  return (
    <>
      <NavBar />
      <div className='mpp-container'>
        <h1 className='mpp-page-title'>My Photos</h1>
        <p className='mpp-page-desc'>
          Check the status of Orders or Browse through your <br /> Purchases
        </p>
        <div className='mpp-photos-container'>{renderMyPhotos()}</div>
      </div>
      <MailingList />
      <Footer />
    </>
  );
};

const downloadIcon = (
  <svg width='19' height='17' viewBox='0 0 19 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M9.40649 10.8158L12.5708 7.71152M9.40649 10.8158V1.50293V10.8158ZM9.40649 10.8158L6.24219 7.71152L9.40649 10.8158Z'
      stroke='white'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M1.49609 12.3682L1.98735 14.2967C2.07291 14.6324 2.27041 14.9305 2.54848 15.1436C2.82655 15.3566 3.16922 15.4723 3.52203 15.4724H15.2916C15.6444 15.4723 15.9871 15.3566 16.2652 15.1436C16.5432 14.9305 16.7407 14.6324 16.8263 14.2967L17.3175 12.3682'
      stroke='white'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);

export default MyPhotosPage;
