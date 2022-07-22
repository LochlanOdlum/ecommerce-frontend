import React, { useEffect, useState } from 'react';

import adminApi from '../../api/adminApi';
import AdminNavSideBar from '../../components/AdminNavSideBar';
import AdminPageNumberNav from '../../components/AdminPageNumberNav';
import AdminModalParent from '../../components/AdminModalParent';
import AdminOrderDetailsModal from '../../components/AdminOrderDetailsModal';

import './index.css';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [orderDetailsModal, setOrderDetailsModal] = useState({ isOpen: false, orderId: null });

  const closeOrderDetailsModal = () => {
    setOrderDetailsModal({ isOpen: false, orderId: null });
  };

  useEffect(() => {
    const updatePhotos = async () => {
      try {
        const { orders, pageCount } = await adminApi.getOrders(activePage, 8);
        setTotalPages(pageCount);
        setOrders(orders);
      } catch (error) {
        console.error(error);
      }
    };

    updatePhotos();
  }, [activePage]);

  const renderTableRows = () => {
    if (!orders) {
      return null;
    }

    return orders.map((order) => {
      const [creationDate, creationTime] = order.createdAt.split('.')[0].split('T');

      return (
        <tr className='admin-table-body-row' key={order.id}>
          {/* <td className='text-center'>
            <img className='admin-page-photo-preview' src={photo.imageWmarkedMedSquarePublicURL} />
          </td> */}
          <td className='admin-table-cell text-center'>#{order.id}</td>
          <td className='admin-table-cell text-center'>{order.customerName}</td>
          <td className='admin-table-cell text-center'>
            {creationTime} {creationDate.split('-').join('/')}
          </td>
          <td className='admin-table-cell text-center'>£{order.totalPriceInPence / 100}</td>
          <td className='admin-table-cell text-center'>
            <button
              className='admin-table-details-button'
              onClick={() => {
                setOrderDetailsModal({ isOpen: true, orderId: order.id });
              }}
            >
              Details
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <AdminNavSideBar />
      {orderDetailsModal.isOpen && (
        <AdminModalParent closeModal={closeOrderDetailsModal}>
          <AdminOrderDetailsModal closeModal={closeOrderDetailsModal} orderId={orderDetailsModal.orderId} />
        </AdminModalParent>
      )}
      <div className='ap-main'>
        <div className='ap-main-inner'>
          <div className='ap-main-users-table card'>
            <div className='ap-main-users-table-header'>Orders</div>
            <table>
              <thead>
                <tr>
                  <th className='admin-table-cell admin-photos-table-header '>Order #</th>
                  <th className='admin-table-cell admin-photos-table-header '>Name</th>
                  <th className='admin-table-cell admin-photos-table-header'>Date</th>
                  <th className='admin-table-cell admin-photos-table-header'>Total</th>
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

export default AdminOrdersPage;
