import React, { useRef, useState, useEffect } from 'react';

import adminApi from '../../api/adminApi';
import useCollections from '../../hooks/useCollections';

import './AdminAddOrEditPhotoModal.css';

const AdminAddOrEditPhotoModal = ({ currentPhotoBeingEdited = null, closeModal }) => {
  //If edit mode then set these default values to values passed from props
  const { collections, isLoaded: isCollectionsLoaded } = useCollections();
  const imageUploadInputLabelEle = useRef(null);
  const [collectionId, setCollectionId] = useState(currentPhotoBeingEdited?.collectionId || '');
  const [photoTitle, setPhotoTitle] = useState(currentPhotoBeingEdited?.title || '');
  const [photoDescription, setPhotoDescription] = useState(currentPhotoBeingEdited?.description || '');
  const [photoPrice, setPhotoPrice] = useState(currentPhotoBeingEdited?.priceInPence / 100 || '');
  const [photoURL, setPhotoURL] = useState(currentPhotoBeingEdited?.imageWmarkedMedPublicURL || null);
  const [imageFile, setImageFile] = useState(null);

  //Insures the closeModal function gets called when component unmounts.
  //closeModal helps with cleanup so is important to insure it runs
  useEffect(() => {
    return () => {
      closeModal();
    };
  }, [closeModal]);

  useEffect(() => {
    if (isCollectionsLoaded && !collectionId) {
      setCollectionId(collections[0].id);
    }
  }, [isCollectionsLoaded, collections, collectionId]);

  const handleImageUploadChange = (e) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    setImageFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoURL(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddPhoto = async () => {
    const priceInPence = photoPrice * 100;

    await adminApi.addPhoto(imageFile, photoTitle, photoDescription, priceInPence, collectionId);

    closeModal();
  };

  const handleEditPhoto = async () => {
    const priceInPence = photoPrice * 100;

    await adminApi.editPhoto(currentPhotoBeingEdited.id, {
      imageFile,
      photoTitle,
      photoDescription,
      priceInPence,
      collectionId,
    });

    closeModal();
  };

  const renderCollectionSelect = () => {
    if (!isCollectionsLoaded) {
      return null;
    }

    return collections.map((collection) => {
      return (
        <option value={collection.id} key={collection.id}>
          {collection.name}
        </option>
      );
    });
  };

  return (
    <div className='ap-image-upload-modal'>
      <div className='ap-image-upload-input-container'>
        <label
          htmlFor='ap-image-upload-input'
          className='ap-image-upload-input-label'
          ref={imageUploadInputLabelEle}
          style={{ backgroundImage: `url('${photoURL}')` }}
        >
          {!photoURL && <div>+ Select Photo</div>}
        </label>
        <input
          type='file'
          accept='image/png, image/jpg, image/jpeg, image/webp'
          onChange={handleImageUploadChange}
          id='ap-image-upload-input'
        />
      </div>
      <div className='ap-iu-input-grid'>
        <label className='ap-iu-input-grid-label'>Title</label>
        <input
          className='ap-iu-input-field'
          type='text'
          value={photoTitle}
          onChange={(e) => setPhotoTitle(e.target.value)}
        />

        <label className='ap-iu-input-grid-label'>Collection</label>
        <select
          className='ap-iu-input-field ap-iu-input-field-collection'
          value={collectionId}
          onChange={(e) => {
            setCollectionId(e.target.value);
          }}
        >
          {renderCollectionSelect()}
        </select>

        <label className='ap-iu-input-grid-label'>Price</label>
        <input
          className='ap-iu-input-field ap-iu-input-field-price'
          pattern='d\+\.\d\d$'
          type='number'
          step='.01'
          value={photoPrice}
          onChange={(e) => {
            const validated = e.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/);
            if (validated) {
              setPhotoPrice(e.target.value);
            }
          }}
        />

        <label className='ap-iu-input-grid-label'>Description</label>
        <textarea
          className='ap-iu-input-field apiu-description-textarea'
          value={photoDescription}
          onChange={(e) => setPhotoDescription(e.target.value)}
        />
      </div>
      <button
        onClick={currentPhotoBeingEdited ? handleEditPhoto : handleAddPhoto}
        className='ap-image-upload-submit-button'
      >
        {currentPhotoBeingEdited ? 'Edit' : 'Add Photo'}
      </button>
    </div>
  );
};

export default AdminAddOrEditPhotoModal;
