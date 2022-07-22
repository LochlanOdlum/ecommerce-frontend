import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCollection, editCollection } from '../../actions/collectionActions';

const AdminAddOrEditCollectionModal = ({
  setIsCollectionAddEditOpen,
  editingCollectionId,
  editingCollectionName,
  setEditingCollectionName,
}) => {
  const [collectionAddEditName, setCollectionAddEditName] = useState(editingCollectionName || '');
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setEditingCollectionName('');
    };
  }, [setEditingCollectionName]);

  const handleEditCollectionSubmit = (e) => {
    e.preventDefault();
    dispatch(editCollection(editingCollectionId, collectionAddEditName));
    setIsCollectionAddEditOpen(false);
  };

  const handleAddCollectionSubmit = (e) => {
    e.preventDefault();
    dispatch(addCollection(collectionAddEditName));
    setIsCollectionAddEditOpen(false);
  };

  return (
    <div className='apc-add-collection'>
      <form
        className='apc-ac-form'
        onSubmit={editingCollectionName ? handleEditCollectionSubmit : handleAddCollectionSubmit}
      >
        <input
          value={collectionAddEditName}
          className='apc-ac-input'
          onChange={(e) => {
            setCollectionAddEditName(e.target.value);
          }}
        ></input>
        <button className='apc-ac-add-button' type='submit'>
          <div className='apc-ac-add-text'>{editingCollectionName ? 'Edit' : 'Add'}</div>
        </button>
      </form>
    </div>
  );
};

export default AdminAddOrEditCollectionModal;
