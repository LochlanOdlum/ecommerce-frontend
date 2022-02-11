import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import AdminNavSideBar from '../../components/AdminNavSideBar';
import useCollections from '../../hooks/useCollections';
import useClickOutsideClose from '../../hooks/useClickOutsideClose';
import { addCollection } from '../../actions/collectionActions';

import './index.css';

const AdminCollectionsPage = () => {
  const dispatch = useDispatch();
  const collectionAddContainer = useRef(null);
  const [collectionAddName, setCollectionAddName] = useState('');
  const [isCollectionAddOpen, setIsCollectionAddOpen] = useClickOutsideClose(collectionAddContainer);
  const { collections, isLoaded, error } = useCollections();

  const handleAddCollectionSubmit = (e) => {
    e.preventDefault();
    dispatch(addCollection(collectionAddName));
    setCollectionAddName('');
    setIsCollectionAddOpen(false);
  };

  const renderAddCollection = () => {
    return (
      isCollectionAddOpen && (
        <div className='apc-add-collection-container'>
          <div className='apc-add-collection' ref={collectionAddContainer}>
            <form onSubmit={handleAddCollectionSubmit}>
              <input
                value={collectionAddName}
                onChange={(e) => {
                  setCollectionAddName(e.target.value);
                }}
              ></input>
            </form>
          </div>
        </div>
      )
    );
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
            <button className='admin-table-details-button'>Edit</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <AdminNavSideBar />
      {renderAddCollection()}
      <div className='ap-main'>
        <div className='ap-main-inner'>
          <div className='ap-main-users-table card'>
            <div className='ap-main-users-table-header'>
              Collections
              <button
                className='admin-table-add-photo-button'
                onClick={() => {
                  setCollectionAddName('');
                  setIsCollectionAddOpen(true);
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
              <tbody>
                {renderCollectionTableRows()}
                {/* <tr className='admin-table-body-row'>
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
                </tr> */}
              </tbody>
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
