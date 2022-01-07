import React, { useRef, useState } from 'react';

import adminApi from '../../api/adminApi';

import './AdminAddOrEditPhotoModal.css';

const AdminAddOrEditPhotoModal = ({ isEditMode = false }) => {
  //If edit mode then set these default values to values passed from props
  const imageUploadInputLabelEle = useRef(null);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoPrice, setPhotoPrice] = useState(20);
  const [photoURL, setPhotoURL] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);

  const handleImageUploadChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    setPhotoFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoURL(reader.result);
      console.log('t');
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddOrEditPhoto = () => {
    //Handle adding a new photo
    if (!isEditMode) {
      adminApi.addPhoto(
        photoFile,
        photoTitle,
        photoDescription,
        photoPrice * 100
      );
    }

    //Handle editing an existing photo
    if (isEditMode) {
    }
  };

  return (
    <div className="ap-image-upload-modal">
      <div className="ap-image-upload-input-container">
        <label
          htmlFor="ap-image-upload-input"
          className="ap-image-upload-input-label"
          ref={imageUploadInputLabelEle}
          style={{ backgroundImage: `url('${photoURL}')` }}
        >
          {!photoURL && <div>+ Select Photo</div>}
        </label>
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          onChange={handleImageUploadChange}
          id="ap-image-upload-input"
        />
      </div>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={photoTitle}
          onChange={(e) => setPhotoTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={photoDescription}
          onChange={(e) => setPhotoDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={photoPrice}
          onChange={(e) => setPhotoPrice(e.target.value)}
        />
      </div>

      <button
        onClick={handleAddOrEditPhoto}
        className="ap-image-upload-submit-button"
      >
        {isEditMode ? 'Edit' : 'Add Photo'}
      </button>
    </div>
  );
};

export default AdminAddOrEditPhotoModal;
