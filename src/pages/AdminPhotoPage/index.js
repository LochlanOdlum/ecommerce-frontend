import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import AdminAddOrEditPhotoModal from '../../components/AdminAddOrEditPhotoModal';

import './adminPhotoPage.css';

const AdminPhotoPage = () => {
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const imageUploadModalContainerRef = useRef(null);

  const handleAddPhotoButtonClick = () => {
    setShowImageUploadModal(true);
  };

  const handleModalContainerClick = (e) => {
    if (imageUploadModalContainerRef.current !== e.target) {
      return;
    }
    setShowImageUploadModal(false);
  };

  const renderImageUploadModal = () => {
    return (
      showImageUploadModal && (
        <div
          className='ap-image-upload-modal-container'
          onClick={handleModalContainerClick}
          ref={imageUploadModalContainerRef}
        >
          <AdminAddOrEditPhotoModal />
        </div>
      )
    );
  };

  return (
    <>
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
                  <th className='admin-table-cell'>#</th>
                  <th className='admin-table-cell text-left'>Title</th>
                  <th className='admin-table-cell'>Date</th>
                  <th className='admin-table-cell'>Price</th>
                  <th className='admin-table-cell'>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className='admin-table-body-row'>
                  <td className='text-center'>#327</td>
                  <td className='admin-table-cell'>
                    <div className='admin-table-cell-name-wrapper'>
                      <img alt='user-icon' src='/images/user.png' className='admin-table-cell-user-icon'></img>
                      Lochlan Odlum
                    </div>
                  </td>
                  <td className='admin-table-cell text-center'>20:30 01/12/2021 </td>
                  <td className='admin-table-cell text-center'>£32.99</td>
                  <td className='admin-table-cell text-center'>
                    <button className='admin-table-details-button'>Edit</button>
                  </td>
                </tr>
                <tr className='admin-table-body-row'>
                  <td className='text-center'>#326</td>
                  <td className='admin-table-cell'>
                    <div className='admin-table-cell-name-wrapper'>
                      <img src='/images/user.png' alt='user-icon' className='admin-table-cell-user-icon'></img>
                      George Ward
                    </div>
                  </td>
                  <td className='admin-table-cell text-center'>20:30 28/11/2021 </td>
                  <td className='admin-table-cell text-center'>£19.99</td>
                  <td className='admin-table-cell text-center'>
                    <button className='admin-table-details-button'>Edit</button>
                  </td>
                </tr>
                <tr className='admin-table-body-row'>
                  <td className='text-center'>#325</td>
                  <td className='admin-table-cell'>
                    <div className='admin-table-cell-name-wrapper'>
                      <img src='/images/user.png' alt='user-icon' className='admin-table-cell-user-icon'></img>
                      George Goldsmith
                    </div>
                  </td>
                  <td className='admin-table-cell text-center'>20:30 27/11/2021 </td>
                  <td className='admin-table-cell text-center'>£26.49</td>
                  <td className='admin-table-cell text-center'>
                    <button className='admin-table-details-button'>Edit</button>
                  </td>
                </tr>
                <tr className='admin-table-body-row'>
                  <td className='text-center'>#324</td>
                  <td className='admin-table-cell'>
                    <div className='admin-table-cell-name-wrapper'>
                      <img src='images/user.png' alt='user-icon' className='admin-table-cell-user-icon'></img>
                      Eddie Hall
                    </div>
                  </td>
                  <td className='admin-table-cell text-center'>20:30 13/11/2021 </td>
                  <td className='admin-table-cell text-center'>£129.99</td>
                  <td className='admin-table-cell text-center'>
                    <button className='admin-table-details-button'>Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='ap-main-users-table-footer'>
              <div className='ap-main-users-table-footer-link'>
                <Link to='/admin/orders'>{'All Orders >'}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPhotoPage;
