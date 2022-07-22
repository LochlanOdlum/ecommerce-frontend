import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import adminApi from '../../api/adminApi';

import './AdminRecentOrdersWidget.css';

const AdminRecentOrdersWidget = () => {
  const [recentOrders, setRecentOrders] = useState(null);

  console.log(recentOrders);

  useEffect(() => {
    const getRecentOrders = async () => {
      const { recentOrders: orders } = await adminApi.getRecentOrders();

      setRecentOrders(orders);
    };

    getRecentOrders();
  }, []);

  const renderTableRows = () => {
    if (!recentOrders) {
      console.log('t');
      return null;
    }
    console.log('p');

    return recentOrders.map((order) => {
      const [creationDate, creationTime] = order.createdAt.split('.')[0].split('T');

      return (
        <tr className='admin-table-body-row'>
          <td className='text-center'>#{order.id}</td>
          <td className='admin-table-cell text-center'>
            {/* <div className='admin-table-cell-name-wrapper '> */}
            {/* <img src='/images/user.png' alt='user-icon' className='admin-table-cell-user-icon'></img> */}
            Lochlan Odlum
            {/* </div> */}
          </td>
          <td className='admin-table-cell text-center'>
            {creationTime} {creationDate}
          </td>
          <td className='admin-table-cell text-center'>£{order.totalPriceInPence / 100}</td>
          <td className='admin-table-cell text-center'>
            {/* <button className='admin-table-details-button'>Details</button> */}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className='ap-main-users-table card'>
        <div className='ap-main-users-table-header'>Recent Orders</div>
        <table>
          <thead>
            <tr>
              <th className='admin-table-cell'>#</th>
              <th className='admin-table-cell '>Name</th>
              <th className='admin-table-cell'>Date</th>
              <th className='admin-table-cell'>Total</th>
              {/* <th className='admin-table-cell'>Actions</th> */}
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <div className='ap-main-users-table-footer'>
          <div className='ap-main-users-table-footer-link'>
            <Link to='/admin/orders'>{'All Orders >'}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRecentOrdersWidget;
