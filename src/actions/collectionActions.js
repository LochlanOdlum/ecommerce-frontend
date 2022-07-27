import {
  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_FAIL,
  COLLECTION_LIST_SUCCESS,
  // COLLECTION_POST_SUCCESS,
} from './types';

import collectionsApi from '../api/collectionApi';

export const fetchCollectionList = () => async (dispatch) => {
  try {
    dispatch({
      type: COLLECTION_LIST_REQUEST,
    });

    const productList = await collectionsApi.fetchCollections();

    dispatch({
      type: COLLECTION_LIST_SUCCESS,
      payload: productList,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_LIST_FAIL,
      payload: error,
    });
  }
};
