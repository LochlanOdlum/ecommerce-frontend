import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import useProducts from '../../hooks/useProducts';
import { DeleteCartItem } from '../../actions/cartActions';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useCart from '../../hooks/useCart';
import useCollections from '../../hooks/useCollections';
import useScrollToPrevious from '../../hooks/useScrollToPrevious';

import './index.css';

const CartPage = () => {
  const { cartItems, cartTotal, error, isLoaded: isCartLoaded } = useCart();
  useScrollToPrevious();
  const { collectionMap, isLoaded: isCollectionsLoaded } = useCollections();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoaded = isCartLoaded && isCollectionsLoaded;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) {
    return <div>Error fetching cart data!</div>;
  }

  const handlePhotoClick = (item) => {
    const scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
    navigate(`/photo/${item.id}`, { state: { from: '/cart', scrollPos } });
  };

  const renderCartTableBody = () => {
    if (!isLoaded) {
      return <div>Loading cart data!</div>;
    }

    return cartItems.map((item) => {
      return (
        <tr className='cp-cart-table-row' key={item.id}>
          <td
            className='cp-photo-cell'
            onClick={() => {
              handlePhotoClick(item);
            }}
          >
            <img className='cp-photo-img' alt='cart-item' src={`${item.imageWmarkedMedSquarePublicURL}`} />
            <div className='cp-photo-cell-info'>
              <div className='cp-photo-title'>{item.title}</div>
              <div className='cp-photo-collection-name'>{collectionMap[item.collectionId]}</div>
            </div>
          </td>
          <td className='text-center cp-cell'>£{item.priceInPounds}</td>
          <td className='text-center cp-cell'>
            <img
              alt='del-icon'
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
      <Footer />
    </div>
  );
};

export default CartPage;
