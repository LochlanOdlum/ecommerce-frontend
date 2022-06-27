import React from 'react';
import useOrders from '../../hooks/useOrders';
import NavBar from '../../components/NavBar';
import MailingList from '../../components/MailingList';
import Footer from '../../components/Footer';
import ordersApi from '../../api/ordersApi';
import ImageDownload from '../../components/ImageDownload';

import './index.css';

const MyPhotosPage = () => {
  const { orderItems, isLoading, error } = useOrders();

  //TODO: UX for downloading
  // When downloading have download wheel and disable access to click button. Grey it out a bit etc..
  const handleDownloadClick = async (title, endpoint) => {
    console.log('clicked download');
    const objectURL = await ordersApi.fetchSecureImage(endpoint);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = objectURL;
    // the filename you want
    a.download = title;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(objectURL);
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
            <ImageDownload endpoint={`photoMedCropped2to1/${photo.imageMedCropped2to1Key}`} />
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
            <button
              className='orange-brown-button mpp-download-button'
              onClick={() => {
                handleDownloadClick(photo.title, `photo/${photo.imageKey}`);
              }}
            >
              Download
              <div className='mpp-download-icon'>{downloadIcon} </div>
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
