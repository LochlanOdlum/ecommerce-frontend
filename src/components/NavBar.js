import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

{
  /* <Link to='/login'>Login</Link>
<br />
<Link to='/cart'>Cart</Link> */
}
const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div>
        <Link to='/'>Home |</Link>
        <Link to='/cart'>| Cart </Link>
        {!isLoggedIn && <Link to='/login'>|| Login</Link>}
        {isLoggedIn && <button onClick={handleLogOut}>Logout</button>}
      </div>
      <br />
    </>
  );
};

export default NavBar;
