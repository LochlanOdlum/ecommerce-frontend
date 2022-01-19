import React from 'react';
import { Link } from 'react-router-dom';

import AdminSummaryWidget from '../../components/AdminSummaryWidget';
// import AdminNavSideBar from '../../components/AdminNavSideBar';
import './adminDashboardPage.css';

const AdminPage = () => {
  return (
    <>
      <section className='ap-main'>
        <div className='ap-main-inner'>
          <div className='ap-main-summary-row'>
            <AdminSummaryWidget heading={'Total Orders'} subheading='All time orders' number='26' />
            <AdminSummaryWidget heading={'Revenue'} subheading='Total revenue' number='£1,223' />
            <AdminSummaryWidget heading={'Total Users'} subheading='Signed up users' number='54' />
          </div>
          <div className='ap-main-users-table card'>
            <div className='ap-main-users-table-header'>Recent Orders</div>
            <table>
              <thead>
                <tr>
                  <th className='admin-table-cell'>#</th>
                  <th className='admin-table-cell text-left'>Name</th>
                  <th className='admin-table-cell'>Date</th>
                  <th className='admin-table-cell'>Total</th>
                  <th className='admin-table-cell'>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className='admin-table-body-row'>
                  <td className='text-center'>#327</td>
                  <td className='admin-table-cell'>
                    <div className='admin-table-cell-name-wrapper'>
                      <img src='/images/user.png' alt='user-icon' className='admin-table-cell-user-icon'></img>
                      Lochlan Odlum
                    </div>
                  </td>
                  <td className='admin-table-cell text-center'>20:30 01/12/2021 </td>
                  <td className='admin-table-cell text-center'>£32.99</td>
                  <td className='admin-table-cell text-center'>
                    <button className='admin-table-details-button'>Details</button>
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
                    <button className='admin-table-details-button'>Details</button>
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
                    <button className='admin-table-details-button'>Details</button>
                  </td>
                </tr>
                <tr className='admin-table-body-row'>
                  <td className='text-center'>#324</td>
                  <td className='admin-table-cell'>
                    <div className='admin-table-cell-name-wrapper'>
                      <img src='/images/user.png' alt='user-icon' className='admin-table-cell-user-icon'></img>
                      Eddie Hall
                    </div>
                  </td>
                  <td className='admin-table-cell text-center'>20:30 13/11/2021 </td>
                  <td className='admin-table-cell text-center'>£129.99</td>
                  <td className='admin-table-cell text-center'>
                    <button className='admin-table-details-button'>Details</button>
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
      </section>
    </>
  );
};

export default AdminPage;
