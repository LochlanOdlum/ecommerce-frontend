import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import MailingList from '../../components/MailingList';

import useProducts from '../../hooks/useProducts';

import useCollections from '../../hooks/useCollections';
import { fetchProduct } from '../../actions/productActions';
import { AddCartItem } from '../../actions/cartActions';

import './index.css';

const PhotoDetailsPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.scrollPos);
  const id = Number(useParams().id);
  const dispatch = useDispatch();

  const { products, isLoaded: isProductsLoaded, error } = useProducts();
  const { collectionMap, isLoaded: isCollectionsLoaded } = useCollections();

  const isLoaded = isProductsLoaded && isCollectionsLoaded;

  useEffect(() => {
    //Causes product to be updated in product List
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    dispatch(AddCartItem(id));
    navigate('/cart');
  };

  const handleClickBack = () => {
    let returnUrl = '/shop';

    if (location?.state?.from) {
      returnUrl = location.state.from;
    }

    navigate(returnUrl, { state: { ...location.state, from: null } });
  };

  const renderProduct = () => {
    if (error) {
      return <div>Error loading product data</div>;
    }
    if (!isLoaded) {
      return <div>Loading</div>;
    }

    const product = products.find((p) => p.id === id);

    return (
      <>
        <div className='pd-details-image-left'>
          <img alt='skylight-photography' className='pd-details-image' src={product.imageWmarkedMedPublicURL} />
        </div>
        <div className='pd-details-right'>
          <h4 className='pd-collection'>{collectionMap[product.collectionId]}</h4>
          <h1 className='pd-title'>{product.title}</h1>
          <h2 className='pd-price'>£{product.priceInPence / 100}</h2>
          <p className='pd-description'>{product.description}</p>

          <button onClick={handleAddToCart} className='grey-blue-button pd-add-to-basket-button'>
            Add to Basket
          </button>
          <p4 className='pd-share-this'>Share this</p4>
          <div className='pd-share-this-buttons'>
            {/* <img src='/images/linked-in-logo-footer.png' className='pd-linked-logo' alt='linked-in-logo' /> */}
            <a
              target='_blank'
              rel='noreferrer'
              href={`https://twitter.com/intent/tweet?url=https://skylightphotography.co.uk/photo/${product.id}&text=Check+out+this+awesome+photo+from+Skylight+Photography!`}
            >
              <img src='/images/twitter-logo-footer.png' className='pd-linked-logo' alt='twitter-logo' />
            </a>
            <a
              target='_blank'
              rel='noreferrer'
              href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fskylightphotography.co.uk%2Fphoto%2F${product.id}`}
            >
              <img src='/images/facebook-logo-footer.png' className='pd-linked-logo' alt='facebook-logo' />
            </a>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <NavBar />
      <div className='pd-back-arrow-container'>
        <div className='pd-back-arrow' onClick={handleClickBack}>
          <svg width='41' height='30' viewBox='0 0 41 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M0.585786 13.5858C-0.195262 14.3668 -0.195262 15.6332 0.585786 16.4142L13.3137 29.1421C14.0948 29.9232 15.3611 29.9232 16.1421 29.1421C16.9232 28.3611 16.9232 27.0948 16.1421 26.3137L4.82843 15L16.1421 3.68629C16.9232 2.90524 16.9232 1.63891 16.1421 0.857864C15.3611 0.0768158 14.0948 0.0768158 13.3137 0.857864L0.585786 13.5858ZM41 13L2 13V17L41 17V13Z'
              fill='#8D8A8A'
            />
          </svg>
          Back
        </div>
      </div>
      <div className='pd-details-container'>{renderProduct()}</div>
      <MailingList />
      <Footer />
    </div>
  );
};

export default PhotoDetailsPage;
