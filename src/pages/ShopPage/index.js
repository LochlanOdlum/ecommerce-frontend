import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddCartItem } from '../../actions/cartActions';
import useProducts from '../../hooks/useProducts';
import NavBar from '../../components/NavBar';
import MailingList from '../../components/MailingList';
import Footer from '../../components/Footer';
import TwoPointPriceSlider from '../../components/TwoPointPriceSlider';

import './index.css';

const PRODS_PER_PAGE = 9;

const ShopPage = () => {
  const { products, collections, isLoaded, error, maxProductPrice } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);
  //Min and max values for price filter
  const minValue = 0;
  const maxValue = Math.ceil(maxProductPrice);
  //Set active collection id for filtering, null means all collections
  const [activeCollection, setActiveCollection] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [isCollectionsFilterOpen, setIsCollectionsFilterOpen] = useState(true);
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(minValue);
  const [maxPrice, setMaxPrice] = useState(maxValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMaxPrice(Math.ceil(maxProductPrice));
  }, [maxProductPrice]);

  useEffect(() => {
    const filterProducts = (prods) => {
      const filteredProducts = prods.filter((prod) => {
        const isValidPrice = prod.priceInPounds >= minPrice && prod.priceInPounds <= maxPrice;
        const isValidCollection = activeCollection === null || prod.collectionId === activeCollection ? true : false;

        return isValidPrice && isValidCollection;
      });

      return filteredProducts;
    };

    setFilteredProducts(filterProducts(products));
  }, [products, activeCollection, minPrice, maxPrice]);

  const scrollToTop = () => {
    const scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop;

    if (scrollPos > 460) {
      window.scrollTo(0, 0);
    }
  };

  const changePageNum = (amount) => {
    const finalPageNum = Math.floor(products.length / PRODS_PER_PAGE);
    if (pageNum + amount >= 0 && pageNum + amount <= finalPageNum) {
      window.scrollTo(0, 0);
      setPageNum(pageNum + amount);
    }
  };

  const renderProducts = () => {
    if (error) {
      return <div>Error fetching product data!</div>;
    }

    if (!isLoaded) {
      return <div>Loading product data!</div>;
    }

    const renderedProductElements = [];

    for (let i = PRODS_PER_PAGE * pageNum; i < PRODS_PER_PAGE * (pageNum + 1); i++) {
      const product = filteredProducts[i];
      if (!product) {
        continue;
      }

      renderedProductElements.push(
        <div className='photo-container' key={product.id}>
          <div className='sp-photo-img-container'>
            <div
              className='sp-photo-img'
              style={{ backgroundImage: `url('${product.mediumCroppedSquareWatermarkedImagePublicURL}')` }}
              // stlye={{ backgroundImage: product.mediumCroppedSquareWatermarkedImagePublicURL }}
            />
          </div>
          <div className='sp-photo-title'>{product.title}</div>
          <div className='shop-photo-bottom'>
            <button
              className='orange-brown-button shop-add-to-cart'
              onClick={() => {
                console.log('adding to cart');
                dispatch(AddCartItem(product.id));
                navigate('/cart');
              }}
            >
              Add To Cart
            </button>
            <div className='shop-photo-price'>£{product.priceInPounds}</div>
          </div>
          {/* <Link to={`/photo/${product.id}`}>Click me!</Link> */}
        </div>
      );
    }

    return renderedProductElements;
  };

  const renderCollectionFilters = () => {
    return collections.map((collection) => (
      <div
        className={`shop-filter-block-filter ${activeCollection === collection.id ? 'active' : ''}`}
        onClick={() => {
          setActiveCollection(collection.id);
          scrollToTop();
        }}
      >
        {collection.name}
      </div>
    ));
  };

  const renderPageArrows = () => {
    if (filteredProducts.length <= PRODS_PER_PAGE) {
      return <div className='no-filter-arrow-padding'></div>;
      // return null;
    }

    return (
      <div className='sp-page-arrows'>
        <svg
          className='sp-arrow-left'
          onClick={() => {
            changePageNum(-1);
          }}
          width='39'
          height='39'
          viewBox='0 0 39 39'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect x='0.5' y='0.5' width='38' height='38' stroke='#8D8A8A' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M29.4324 19.4998C29.4324 19.8221 29.3016 20.1313 29.0687 20.3592C28.8359 20.5871 28.5201 20.7152 28.1908 20.7152H13.8055L19.137 25.9315C19.2524 26.0445 19.344 26.1787 19.4065 26.3263C19.4689 26.474 19.5011 26.6322 19.5011 26.792C19.5011 26.9518 19.4689 27.1101 19.4065 27.2577C19.344 27.4053 19.2524 27.5395 19.137 27.6525C19.0215 27.7655 18.8845 27.8551 18.7337 27.9163C18.5828 27.9774 18.4212 28.0089 18.2579 28.0089C18.0947 28.0089 17.933 27.9774 17.7822 27.9163C17.6313 27.8551 17.4943 27.7655 17.3789 27.6525L9.92922 20.3603C9.8136 20.2474 9.72186 20.1133 9.65926 19.9656C9.59667 19.818 9.56445 19.6597 9.56445 19.4998C9.56445 19.34 9.59667 19.1817 9.65926 19.034C9.72186 18.8863 9.8136 18.7522 9.92922 18.6393L17.3789 11.3471C17.612 11.1189 17.9282 10.9907 18.2579 10.9907C18.5876 10.9907 18.9038 11.1189 19.137 11.3471C19.3701 11.5754 19.5011 11.8849 19.5011 12.2076C19.5011 12.5304 19.3701 12.8399 19.137 13.0681L13.8055 18.2844H28.1908C28.5201 18.2844 28.8359 18.4125 29.0687 18.6404C29.3016 18.8683 29.4324 19.1775 29.4324 19.4998Z'
            fill='#8D8A8A'
          />
        </svg>
        <svg
          className='sp-arrow-right'
          onClick={() => {
            changePageNum(1);
          }}
          width='39'
          height='39'
          viewBox='0 0 39 39'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect x='-0.5' y='0.5' width='38' height='38' transform='matrix(-1 0 0 1 38 0)' stroke='#8D8A8A' />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M9.56762 19.4998C9.56762 19.8221 9.69843 20.1313 9.93128 20.3592C10.1641 20.5871 10.4799 20.7152 10.8092 20.7152H25.1945L19.863 25.9315C19.7476 26.0445 19.656 26.1787 19.5935 26.3263C19.5311 26.474 19.4989 26.6322 19.4989 26.792C19.4989 26.9518 19.5311 27.1101 19.5935 27.2577C19.656 27.4053 19.7476 27.5395 19.863 27.6525C19.9785 27.7655 20.1155 27.8551 20.2663 27.9163C20.4172 27.9774 20.5788 28.0089 20.7421 28.0089C20.9053 28.0089 21.067 27.9774 21.2178 27.9163C21.3687 27.8551 21.5057 27.7655 21.6211 27.6525L29.0708 20.3603C29.1864 20.2474 29.2781 20.1133 29.3407 19.9656C29.4033 19.818 29.4355 19.6597 29.4355 19.4998C29.4355 19.34 29.4033 19.1817 29.3407 19.034C29.2781 18.8863 29.1864 18.7522 29.0708 18.6393L21.6211 11.3471C21.388 11.1189 21.0718 10.9907 20.7421 10.9907C20.4124 10.9907 20.0962 11.1189 19.863 11.3471C19.6299 11.5754 19.4989 11.8849 19.4989 12.2076C19.4989 12.5304 19.6299 12.8399 19.863 13.0681L25.1945 18.2844H10.8092C10.4799 18.2844 10.1641 18.4125 9.93128 18.6404C9.69843 18.8683 9.56762 19.1775 9.56762 19.4998Z'
            fill='#8D8A8A'
          />
        </svg>
      </div>
    );
  };

  return (
    <div className='main-shop-container'>
      <NavBar />
      <div className='main-shop'>
        <div className='shop-top'>
          <button className='shop-sort-by-button'>
            <div className='shop-sort-by-text'> Sort By</div>

            <svg
              className='shop-sort-by-arrow'
              width='15'
              height='7'
              viewBox='0 0 15 7'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1.31714 0.299609C1.72031 0.117605 2.19299 0.191547 2.52133 0.487982L5.50846 3.18491C6.65044 4.21595 8.38728 4.21595 9.52925 3.18491L12.5164 0.487982C12.8447 0.191547 13.3174 0.117605 13.7206 0.299609C14.4524 0.629951 14.6045 1.60271 14.0086 2.14075L9.52925 6.18492C8.38728 7.21595 6.65044 7.21595 5.50846 6.18491L1.02912 2.14075C0.43319 1.60271 0.585362 0.629951 1.31714 0.299609Z'
                fill='#8D8A8A'
              />
            </svg>
          </button>
        </div>
        <div className='shop-lower'>
          <div className='content-left'>
            <div className='shop-title'>
              OUR <br /> ARTWORK
            </div>
            <div className='shop-filter-container'>
              <div className='shop-filter-title'>Filter by</div>
              <div className='shop-filter-list'>
                <div className='shop-filter-block'>
                  <div className='shop-filter-header'>
                    <div className='shop-filter-block-title'>Collection</div>
                    <div
                      className='shop-filter-svg-container'
                      onClick={() => {
                        setIsCollectionsFilterOpen(!isCollectionsFilterOpen);
                      }}
                    >
                      {isCollectionsFilterOpen && (
                        <svg
                          className='sp-filter-minus'
                          width='15'
                          height='3'
                          viewBox='0 0 15 3'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M13.4453 1.875H1.44531' stroke='#8D8A8A' stroke-width='2' stroke-linecap='round' />
                        </svg>
                      )}
                      {!isCollectionsFilterOpen && (
                        <svg
                          className='sp-filter-plus'
                          width='14'
                          height='14'
                          viewBox='0 0 14 14'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M13 7H1' stroke='#8D8A8A' stroke-width='2' stroke-linecap='round' />
                          <path d='M7 1L7 13' stroke='#8D8A8A' stroke-width='2' stroke-linecap='round' />
                        </svg>
                      )}
                    </div>
                  </div>
                  {isLoaded && (
                    <div className={`shop-filter-block-filters${isCollectionsFilterOpen ? '' : ' hidden'}`}>
                      <div
                        className={`shop-filter-block-filter ${activeCollection === null ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCollection(null);
                          scrollToTop();
                        }}
                      >
                        All
                      </div>
                      {renderCollectionFilters()}
                    </div>
                  )}
                </div>
                <div className='shop-filter-block'>
                  <div className='shop-filter-header'>
                    <div className='shop-filter-block-title'>Price</div>
                    <div
                      className='shop-filter-svg-container'
                      onClick={() => {
                        setIsPriceFilterOpen(!isPriceFilterOpen);
                      }}
                    >
                      {isPriceFilterOpen && (
                        <svg
                          className='sp-filter-minus'
                          width='15'
                          height='3'
                          viewBox='0 0 15 3'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M13.4453 1.875H1.44531' stroke='#8D8A8A' stroke-width='2' stroke-linecap='round' />
                        </svg>
                      )}
                      {!isPriceFilterOpen && (
                        <svg
                          className='sp-filter-plus'
                          width='14'
                          height='14'
                          viewBox='0 0 14 14'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M13 7H1' stroke='#8D8A8A' stroke-width='2' stroke-linecap='round' />
                          <path d='M7 1L7 13' stroke='#8D8A8A' stroke-width='2' stroke-linecap='round' />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className={`shop-filter-block-filters${isPriceFilterOpen ? '' : ' hidden'}`}>
                    <div className='shop-price-slider-container'>
                      <div className='shop-twopointslider'>
                        {isPriceFilterOpen && (
                          <TwoPointPriceSlider
                            min={minValue}
                            max={maxValue}
                            setMinVal={setMinPrice}
                            setMaxVal={setMaxPrice}
                            initialMin={minPrice}
                            initialMax={maxPrice}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='content-right'>
            <div className='photo-photo-list'>{renderProducts()}</div>
            {renderPageArrows()}
          </div>
        </div>
      </div>
      <MailingList />
      <Footer />
    </div>
  );
};

export default ShopPage;
