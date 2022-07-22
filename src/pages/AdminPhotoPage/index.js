import React, { useEffect, useState } from 'react';

import adminApi from '../../api/adminApi';
import AdminModalParent from '../../components/AdminModalParent';
import AdminAddOrEditPhotoModal from '../../components/AdminAddOrEditPhotoModal';
import AdminNavSideBar from '../../components/AdminNavSideBar';
import AdminPageNumberNav from '../../components/AdminPageNumberNav';

import AdminPhotoPositionField from '../../components/AdminPhotoPositionField';

import './adminPhotoPage.css';

const AdminPhotoPage = () => {
  const [showImageAddOrEditModal, setShowImageAddOrEditModal] = useState(false);
  const [currentPhotoBeingEdited, setCurrentPhotoBeingEdited] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);

  const closeImageAddOrEditModal = () => {
    setCurrentPhotoBeingEdited(null);
    setShowImageAddOrEditModal(false);
  };

  const updatePhotos = async () => {
    try {
      const { products: photos, pageCount } = await adminApi.getPhotos(activePage, 8);
      setTotalPages(pageCount);
      setPhotos(photos);
    } catch (error) {
      console.error(error);
    }
  };

  //Update Photos whenever image add or edit modal is closed. To ensure photos are up to date with any changes
  useEffect(() => {
    if (!showImageAddOrEditModal) {
      updatePhotos();
    }
    // eslint-disable-next-line
  }, [showImageAddOrEditModal]);

  useEffect(() => {
    updatePhotos();
    // eslint-disable-next-line
  }, [activePage]);

  const handleAddPhotoButtonClick = () => {
    setShowImageAddOrEditModal(true);
  };

  const handleEditPhotoButtonClick = (photo) => {
    setCurrentPhotoBeingEdited(photo);
    setShowImageAddOrEditModal(true);
  };

  const handleDeletePhotoButtonClick = async (photoId) => {
    await adminApi.deletePhoto(photoId);
    updatePhotos();
  };

  const renderTableRows = () => {
    if (!photos) {
      return null;
    }

    return photos.map((photo) => {
      const [creationDate, creationTime] = photo.createdAt.split('.')[0].split('T');

      const handlePhotoPositionChange = async (newPosition) => {
        await adminApi.editPhoto(photo.id, { orderPosition: newPosition });
        updatePhotos();
      };

      return (
        <tr className='admin-table-body-row' key={Math.random()}>
          <td className='admin-table-cell text-center'>
            <AdminPhotoPositionField position={photo.orderPosition} onSubmit={handlePhotoPositionChange} />
          </td>
          <td className='text-center'>
            <img className='admin-page-photo-preview' alt='whatever' src={photo.imageWmarkedMedSquarePublicURL} />
          </td>
          <td className='admin-table-cell'>{photo.title}</td>
          <td className='admin-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}
          </td>
          <td className='admin-table-cell text-center'>£{photo.priceInPence / 100}</td>
          <td className='admin-table-cell text-center'>
            <button
              onClick={() => {
                handleEditPhotoButtonClick(photo);
              }}
              className='admin-table-details-button'
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDeletePhotoButtonClick(photo.id);
              }}
              className='admin-table-delete-button admin-photos-page-delete-button'
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <AdminNavSideBar />
      {showImageAddOrEditModal && (
        <AdminModalParent closeModal={closeImageAddOrEditModal}>
          <AdminAddOrEditPhotoModal
            currentPhotoBeingEdited={currentPhotoBeingEdited}
            setCurrentPhotoBeingEdited={setCurrentPhotoBeingEdited}
            closeModal={closeImageAddOrEditModal}
          />
        </AdminModalParent>
      )}
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
