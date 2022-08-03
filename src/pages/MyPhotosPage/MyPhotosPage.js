import React from 'react';
import useOrders from '../../hooks/useOrders';
import NavBar from '../../components/NavBar/NavBar';
import MailingList from '../../components/MailingList/MailingList';
import Footer from '../../components/Footer/Footer';
import { downloadImage } from '../../api/ordersApi';
import ImageDownload from '../../components/ImageDownload/ImageDownload';

import './MyPhotosPage.scss';

const MyPhotosPage = () => {
  const { orderItems, isLoading, error } = useOrders();

  //TODO: UX for downloading
  // When downloading have download wheel and disable access to click button. Grey it out a bit etc..
  const handleDownloadClick = async (s3ImagesKey) => {
    downloadImage(s3ImagesKey);
  };

  const renderMyPhotos = () => {
    if (isLoading) {
      return <div>Loading Photos!</div>;
    }

    if (error) {
      return <div>Error!</div>;
    }

    const photosList = [];

    console.log(orderItems);

    orderItems.forEach((photo) => {
      photosList.push(
        <div className='mpp-photo-container' key={photo.id}>
          <div className='mpp-photo-img-container'>
            <ImageDownload paddingBottom={'84.5%'} endpoint={`/photoMedCropped2to1/${photo.s3ImagesKey}`} />
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
              <div className='mpp-photo-info-text'>£{photo.priceInPence / 100}</div>
            </div>
            <button
              className='button-orange mpp-download-button'
              onClick={() => {
                handleDownloadClick(photo.s3ImagesKey);
              }}
            >
              Download
              <div className='mpp-download-icon'>
                <img src='/images/download-icon-white.svg' alt='download img icon' />
              </div>
            </button>
          </div>
        </div>
      );
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

export default MyPhotosPage;
