import React, { useEffect, useRef, useState } from 'react';

import adminApi from '../../api/adminApi';
import useClickOutsideClose from '../../hooks/useClickOutsideClose';
import AdminAddOrEditPhotoModal from '../../components/AdminAddOrEditPhotoModal';
import AdminNavSideBar from '../../components/AdminNavSideBar';
import AdminPageNumberNav from '../../components/AdminPageNumberNav';

import AdminPhotoPositionField from '../../components/AdminPhotoPositionField';

import './adminPhotoPage.css';

const AdminPhotoPage = () => {
  const imageUploadModalRef = useRef(null);
  const [showImageUploadModal, setShowImageUploadModal] = useClickOutsideClose(imageUploadModalRef);
  const [photos, setPhotos] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const updatePhotos = async () => {
    try {
      const { products: photos, pageCount } = await adminApi.getPhotos(activePage, 8);
      console.log('updating photos');
      setTotalPages(pageCount);
      setPhotos(photos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updatePhotos();
    // eslint-disable-next-line
  }, [activePage]);

  const handleAddPhotoButtonClick = () => {
    setShowImageUploadModal(true);
  };

  const renderImageUploadModal = () => {
    return (
      showImageUploadModal && (
        <div className='ap-image-upload-modal-container'>
          <div ref={imageUploadModalRef}>
            <AdminAddOrEditPhotoModal />
          </div>
        </div>
      )
    );
  };

  const renderTableRows = () => {
    if (!photos) {
      return null;
    }

    return photos.map((photo) => {
      const [creationDate, creationTime] = photo.createdAt.split('.')[0].split('T');

      return (
        // <tr className='admin-table-body-row' key={`${photo.id} - ${photo.positionOrder}`}>
        <tr className='admin-table-body-row' key={Math.random()}>
          <td className='admin-table-cell text-center'>
            <AdminPhotoPositionField
              position={photo.orderPosition}
              onSubmit={async (newPosition) => {
                await adminApi.editPhoto(photo.id, { orderPosition: newPosition });
                updatePhotos();
              }}
            />
            {/* <input className='admin-table-cell-input admin-table-cell-orderPos-input' value={photo.orderPosition} /> */}
          </td>
          <td className='text-center'>
            <img className='admin-page-photo-preview' alt='whatever' src={photo.imageWmarkedMedSquarePublicURL} />
          </td>
          <td className='admin-table-cell'>{photo.title}</td>
          <td className='admin-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}
          </td>
          <td className='admin-table-cell text-center'>£{photo.priceInPounds}</td>
          <td className='admin-table-cell text-center'>
            <button className='admin-table-details-button'>Edit</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <AdminNavSideBar />
      {renderImageUploadModal()}
      <div className='ap-main'>
        <div className='ap-main-inner'>
          <div className='ap-main-users-table card'>
            <div className='ap-main-users-table-header'>
              Photos
              <button className='admin-table-add-photo-button' onClick={handleAddPhotoButtonClick}>
                Add Photo
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th className='admin-table-cell admin-photos-table-header '>Pos.</th>
                  <th className='admin-table-cell admin-photos-table-header '>Preview</th>
                  <th className='admin-table-cell admin-photos-table-header text-left'>Title</th>
                  <th className='admin-table-cell admin-photos-table-header'>Date</th>
                  <th className='admin-table-cell admin-photos-table-header'>Price</th>
                  <th className='admin-table-cell admin-photos-table-header'>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
            <div className='ap-main-users-table-footer'>
              <div className='ap-photos-page-buttons'>
                <AdminPageNumberNav activePage={activePage} setActivePage={setActivePage} maxPage={totalPages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPhotoPage;
