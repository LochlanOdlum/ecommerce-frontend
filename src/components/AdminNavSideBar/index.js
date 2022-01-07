import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './AdminNavSideBar.css';

const AdminNavSideBar = ({ active }) => {
  const { pathname } = useLocation();

  const getIsAdminPage = () => {
    if (pathname === '/admin/' || pathname === '/admin') {
      return true;
    }

    return false;
  };

  return (
    <nav className='ap-sidebar'>
      <div className='ap-sidebar-header'>SKYLIGHT PHOTOGRAPHY</div>
      <ul className='ap-sidebar-menu'>
        <Link to='/admin/' className={`ap-sidebar-menu-item ${getIsAdminPage() ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' src='/images/dashboard.svg' />
          Dashboard
        </Link>
        <Link to='/admin/photos' className={`ap-sidebar-menu-item ${pathname === '/admin/photos' ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' src='/images/photo.svg' />
          Photos
        </Link>
        <Link to='/admin/orders' className={`ap-sidebar-menu-item ${pathname === '/admin/orders' ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' src='/images/orders.svg' />
          Orders
        </Link>
        <Link to='/admin/users' className={`ap-sidebar-menu-item ${pathname === '/admin/users' ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' src='/images/user.svg' />
          Users
        </Link>
      </ul>
    </nav>
  );
};

export default AdminNavSideBar;
