import { COLLECTION_LIST_REQUEST, COLLECTION_LIST_SUCCESS, COLLECTION_LIST_FAIL } from '../actions/types';

export const collectionReducer = (
  state = { collections: [], isLoading: false, isLoaded: false, error: null },
  action
) => {
  switch (action.type) {
    case COLLECTION_LIST_REQUEST:
      return { collections: [], isLoading: true, isLoaded: false, error: null };
    case COLLECTION_LIST_SUCCESS:
      return { collections: action.payload, isLoading: false, isLoaded: true, error: null };
    case COLLECTION_LIST_FAIL:
      return { collections: [], isLoading: false, isLoaded: false, error: action.payload };
    default:
      return state;
  }
};
