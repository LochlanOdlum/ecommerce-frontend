import React, { useEffect, useState } from 'react';

import adminApi from '../../api/adminApi';
import AdminNavSideBar from '../../components/AdminNavSideBar';
import AdminPageNumberNav from '../../components/AdminPageNumberNav';

import './index.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const updatePhotos = async () => {
      try {
        const { users, pageCount } = await adminApi.getUsers(activePage, 8);
        setTotalPages(pageCount);
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };

    updatePhotos();
  }, [activePage]);

  const renderTableRows = () => {
    if (!users) {
      return null;
    }

    return users.map((user) => {
      const [creationDate, creationTime] = user.createdAt.split('.')[0].split('T');

      return (
        <tr className='admin-table-body-row'>
          {/* <td className='text-center'>
            <img className='admin-page-photo-preview' src={photo.imageWmarkedMedSquarePublicURL} />
          </td> */}
          <td className='admin-table-cell text-center'>{user.name}</td>
          <td className='admin-table-cell text-center'>{user.email}</td>
          <td className='admin-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}
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
      <div className='ap-main'>
        <div className='ap-main-inner'>
          <div className='ap-main-users-table card'>
            <div className='ap-main-users-table-header'>Users</div>
            <table>
              <thead>
                <tr>
                  <th className='admin-table-cell admin-photos-table-header '>Name</th>
                  <th className='admin-table-cell admin-photos-table-header '>Email</th>
                  <th className='admin-table-cell admin-photos-table-header'>Creation Date</th>
                  {/* <th className='admin-table-cell admin-photos-table-header'>Price</th> */}
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

export default AdminUsersPage;
