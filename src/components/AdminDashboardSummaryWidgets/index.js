import React, { useState, useEffect } from 'react';

import AdminSummaryWidget from '../AdminSummaryWidget';
import adminApi from '../../api/adminApi';

const AdminDashboardSummaryWidgets = () => {
  const [summaryData, setSummaryData] = useState(null);

  console.log(summaryData);

  useEffect(() => {
    const getSummaryData = async () => {
      const { summaryDetails: data } = await adminApi.getSummaryData();
      setSummaryData(data);
    };

    getSummaryData();
  }, []);

  return (
    <>
      <AdminSummaryWidget
        heading={'Total Orders'}
        subheading='All time orders'
        value={summaryData ? summaryData.orderCount : ''}
      />
      <AdminSummaryWidget
        heading={'Revenue'}
        subheading='Total revenue'
        value={summaryData ? `£${summaryData?.totalRevenue / 100}` : ''}
      />
      <AdminSummaryWidget
        heading={'Total Users'}
        subheading='Signed up users'
        value={summaryData ? summaryData.userCount : ''}
      />
    </>
  );
};

export default AdminDashboardSummaryWidgets;
