import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { DeleteCartItem } from '../../actions/cartActions';
import useCart from '../../hooks/useCart';
import NavBar from '../../components/NavBar';

import './index.css';

const CartPage = () => {
  const { cartItems, cartTotal, error, isLoaded } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (error) {
    return <div>Error fetching cart data!</div>;
  }

  const renderCartTableBody = () => {
    if (!isLoaded) {
      return <div>Loading cart data!</div>;
    }

    return cartItems.map((item) => {
      return (
        <tr className='cp-cart-table-row' key={item.id}>
          <td className='cp-photo-cell'>
            <img className='cp-photo-img' src={`${item.mediumCroppedSquareWatermarkedImagePublicURL}`} />
            <div className='cp-photo-cell-info'>
              <div className='cp-photo-title'>{item.title}</div>
              <div className='cp-photo-collection-name'>Wildlife</div>
            </div>
          </td>
          <td className='text-center cp-cell'>£{item.price}</td>
          <td className='text-center cp-cell'>
            <img
              src='/images/del-icon.png'
              onClick={() => {
                dispatch(DeleteCartItem(item.id));
              }}
            />
          </td>
        </tr>
      );
    });
  };

  // return (
  //   <div>
  //     {renderCartItems()}
  //     Cart total: {cartTotal}
  //     <br />
  //     <Link to='/payment'>Continue to purchase</Link>
  //   </div>
  // );

  return (
    <div className='cp-container'>
      <NavBar />
      <div className='cp'>
        <div className='cp-title'>Shopping Cart</div>
        <div className='cp-cart-info-container'>
          <table className='cp-table'>
            <thead className='cp-thead'>
              <tr>
                <th className='cp-th cp-th-photo text-left'>Photo</th>
                <th className='cp-th cp-th-price text-center'>Price</th>
                <th className='cp-th'>Action</th>
              </tr>
            </thead>
            <tbody>{renderCartTableBody()}</tbody>
          </table>
          <div className='cp-order-summary'>
            <div className='cp-order-summary-inner-content'>
              <div className='cp-order-summary-title'>Order Summary</div>
              <div className='cp-order-summary-subtotal'>
                <div className='cb-order-summary-subtotal-title'>Subtotal</div>
                <div className='cb-order-summary-subtotal-price'>£{cartTotal}</div>
              </div>
              <div className='cp-order-summary-total'>
                <div className='cb-order-summary-total-title'>Total</div>
                <div className='cb-order-summary-total-price'>£{cartTotal}</div>
              </div>
            </div>
            <button
              className='grey-blue-button cp-order-checkout-button'
              onClick={() => {
                navigate('/checkout');
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
