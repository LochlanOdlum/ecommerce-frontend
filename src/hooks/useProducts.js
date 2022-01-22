import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductList } from '../actions/productActions';

import useCollections from './useCollections';

//Purpose is to ensure product list is fetched from server and added to redux state
//Maybe add optional parm for fetchNewList, if true then will fetch product list from backend and update state
//first time the component mounts (could be usefull for cart)

//TODO: Need to only return when collection and products are loaded. Map products so
//TODO: collectionid is turned to collection name.
const useProducts = () => {
  const { collections, collectionMap, isLoaded: isCollectionsLoaded, error: collectionsError } = useCollections();
  const {
    products,
    isLoading,
    isLoaded: isProductsLoaded,
    error: productsError,
  } = useSelector((state) => state.productList);
  const [maxProductPrice, setMaxProductPrice] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isProductsLoaded) {
      dispatch(fetchProductList());
    }
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    //Get max price of product
    let maxPrice = products.reduce(
      (prev, current) => (+current.priceInPounds > prev ? current.priceInPounds : prev),
      0
    );

    setMaxProductPrice(maxPrice);
  }, [products]);

  if (isProductsLoaded && isCollectionsLoaded) {
    return {
      products,
      isLoaded: true,
      error: null,
      collectionMap,
      collections,
      maxProductPrice: maxProductPrice,
    };
  }

  const error = productsError || collectionsError;

  return { products: [], error, collectionMap: [], collections: [], isLoaded: false, maxProductPrice: maxProductPrice };
};

export default useProducts;
