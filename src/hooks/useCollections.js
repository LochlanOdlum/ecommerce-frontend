import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCollectionList } from '../actions/collectionActions';

//Purpose is to ensure product list is fetched from server and added to redux state
//Maybe add optional parm for fetchNewList, if true then will fetch product list from backend and update state
//first time the component mounts (could be usefull for cart)
const useCollections = () => {
  const { collections, isLoading, isLoaded, error } = useSelector((state) => state.collectionList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isLoaded) {
      dispatch(fetchCollectionList());
    }
    // eslint-disable-next-line
  }, []);

  if (isLoaded) {
    //Generate list of collection names,
    const collectionMap = {};

    collections.forEach((collection) => {
      collectionMap[collection.id] = collection.name;
    });

    return { collections, collectionMap, isLoaded, error };
  }

  return { collections: [], collectionMap: {}, isLoaded, error };
};

export default useCollections;
