import React, { useRef, useState } from 'react';

import AdminNavSideBar from '../../components/AdminNavSideBar';
import useCollections from '../../hooks/useCollections';
import useClickOutsideClose from '../../hooks/useClickOutsideClose';
import AdminAddOrEditCollectionModal from '../../components/AdminAddOrEditCollectionModal';

import './index.css';

const AdminCollectionsPage = () => {
  const [editingCollectionName, setEditingCollectionName] = useState(null);
  const [editingCollectionId, setEditingCollectionId] = useState(null);
  const collectionAddEditContainer = useRef(null);
  const [isCollectionAddEditOpen, setIsCollectionAddEditOpen] = useClickOutsideClose(collectionAddEditContainer);
  const { collections, isLoaded, error } = useCollections();

  const handleEditCollectionButtonClick = (collectionId, collectionName) => {
    setEditingCollectionId(collectionId);
    setEditingCollectionName(collectionName);
    setIsCollectionAddEditOpen(true);
  };

  const renderCollectionTableRows = () => {
    if (error) {
      return <div>Error Fetching Collection data</div>;
    }
    if (!isLoaded) {
      return <div> Loading Collection Data </div>;
    }

    return collections.map((collection) => {
      // console.log(collection);
      const [creationDate, creationTime] = collection.createdAt.split('.')[0].split('T');

      return (
        <tr className='admin-table-body-row'>
          <td className='admin-table-cell text-center'>{collection.name}</td>
          <td className='admin-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}{' '}
          </td>
          <td className='admin-table-cell text-center'>
            <button
              className='admin-table-details-button'
              onClick={() => {
                handleEditCollectionButtonClick(collection.id, collection.name);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <AdminNavSideBar />
      {isCollectionAddEditOpen && (
        <AdminAddOrEditCollectionModal
          setIsCollectionAddEditOpen={setIsCollectionAddEditOpen}
          collectionAddEditContainer={collectionAddEditContainer}
          editingCollectionId={editingCollectionId}
          editingCollectionName={editingCollectionName}
          setEditingCollectionName={setEditingCollectionName}
        />
      )}
      <div className='ap-main'>
        <div className='ap-main-inner'>
          <div className='ap-main-users-table card'>
            <div className='ap-main-users-table-header'>
              Collections
              <button
                className='admin-table-add-photo-button'
                onClick={() => {
                  setIsCollectionAddEditOpen(true);
                }}
              >
                Add Collection
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  {/* <th className='admin-table-cell'>#</th> */}
                  <th className='admin-table-cell'>Collection</th>
                  <th className='admin-table-cell'>Date Added</th>
                  <th className='admin-table-cell'>Actions</th>
                </tr>
              </thead>
              <tbody>{renderCollectionTableRows()}</tbody>
            </table>
            <div className='ap-main-users-table-footer'>
              <div className='ap-main-users-table-footer-link'>
                {/* <Link to='/admin/orders'>{'All Orders >'}</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCollectionsPage;
