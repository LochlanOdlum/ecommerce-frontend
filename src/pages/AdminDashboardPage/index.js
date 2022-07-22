import React from 'react';

import AdminNavSideBar from '../../components/AdminNavSideBar';
import AdminDashboardSummaryWidgets from '../../components/AdminDashboardSummaryWidgets';
import AdminRecentOrdersWidget from '../../components/AdminRecentOrdersWidget';
import './adminDashboardPage.css';

const AdminPage = () => {
  return (
    <>
      <AdminNavSideBar />
      <section className='ap-main'>
        <div className='ap-main-inner'>
          <div className='ap-main-summary-row'>
            <AdminDashboardSummaryWidgets />
          </div>
          <AdminRecentOrdersWidget />
        </div>
      </section>
    </>
  );
};

export default AdminPage;
