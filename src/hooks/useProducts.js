import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductList } from '../actions/productActions';

import useCollections from './useCollections';

//Purpose is to ensure product list is fetched from server and added to redux state
//Maybe add optional parm for fetchNewList, if true then will fetch product list from backend and update state
//first time the component mounts (could be usefull for cart)

//TODO: Need to only return when collection and products are loaded. Map products so
//TODO: collectionid is turned to collection name.
const useProducts = () => {
  const priceToPounds = (pence) => {
    const array = Array.from(String(pence));
    array.splice(array.length - 2, 0, '.');

    return array.join('');
  };

  const { collections, collectionMap, isLoaded: isCollectionsLoaded, error: collectionsError } = useCollections();
  const {
    products,
    isLoading,
    isLoaded: isProductsLoaded,
    error: productsError,
  } = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isProductsLoaded) {
      dispatch(fetchProductList());
    }
    // eslint-disable-next-line
  }, []);

  if (isProductsLoaded && isCollectionsLoaded) {
    const productsWithPriceInPounds = [];
    products.forEach((prod) => productsWithPriceInPounds.push({ ...prod }));
    //Ensure product price is converted to pounds from pence
    productsWithPriceInPounds.forEach((product) => {
      if (product.price.toString().includes('.')) {
        return;
      }
      const newPrice = priceToPounds(product.price);
      product.price = newPrice;
    });
    return { products: productsWithPriceInPounds, isLoaded: true, error: null, collectionMap, collections };
  }

  const error = productsError || collectionsError;

  return { products: [], error, collectionMap: [], collections: [], isLoaded: false };
};

export default useProducts;
