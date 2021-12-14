import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './AdminNavSideBar.css';

const AdminNavSideBar = ({ active }) => {
  const { pathname } = useLocation();

  return (
    <nav className='ap-sidebar'>
      <div className='ap-sidebar-header'>SKYLIGHT PHOTOGRAPHY</div>
      <ul className='ap-sidebar-menu'>
        <li className={`ap-sidebar-menu-item ${pathname === '/admin' ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' src='images/dashboard.svg' />
          <Link to='/admin'>Dashboard</Link>
        </li>
        <li className={`ap-sidebar-menu-item ${pathname === '/admin/photos' ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' src='images/photo.svg' />
          <Link to='/admin/photos'>Photos</Link>
        </li>
        <li className={`ap-sidebar-menu-item ${pathname === '/admin/orders' ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' src='images/orders.svg' />
          <Link to='/admin/orders'>Orders</Link>
        </li>
        <li className={`ap-sidebar-menu-item ${pathname === '/admin/users' ? 'active' : ''}`}>
          <img className='ap-sidebar-menu-item-icon' src='images/user.svg' />
          <Link to='/admin/users'>Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavSideBar;
