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
      <div className='ap-sidebar-header'>
        <Link to='/'>SKYLIGHT PHOTOGRAPHY </Link>
      </div>
      <ul className='ap-sidebar-menu'>
        <Link to='/admin/' className={`ap-sidebar-menu-item ${getIsAdminPage() ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' alt='dashboard-icon' src='/images/dashboard.svg' />
          Dashboard
        </Link>
        <Link to='/admin/photos' className={`ap-sidebar-menu-item ${pathname === '/admin/photos' ? 'active' : ''}`}>
          <img alt='photos-icon' className='ap-sidebar-menu-item-icon' src='/images/photo.svg' />
          Photos
        </Link>
        <Link
          to='/admin/collections'
          className={`ap-sidebar-menu-item ${pathname === '/admin/collections' ? 'active' : ''}`}
        >
          <img alt='collections-icon' className='ap-sidebar-menu-item-icon' src='/images/collection-icon.svg' />
          Collections
        </Link>
        <Link
          to='/admin/orders'
          alt='orders-icon'
          className={`ap-sidebar-menu-item ${pathname === '/admin/orders' ? 'active' : ''}`}
        >
          <img alt='orders-icon' className='ap-sidebar-menu-item-icon' src='/images/orders.svg' />
          Orders
        </Link>
        <Link to='/admin/users' className={`ap-sidebar-menu-item ${pathname === '/admin/users' ? 'active' : ''}`}>
          <img alt='users-icon' className='ap-sidebar-menu-item-icon' src='/images/user.svg' />
          Users
        </Link>
      </ul>
    </nav>
  );
};

export default AdminNavSideBar;
