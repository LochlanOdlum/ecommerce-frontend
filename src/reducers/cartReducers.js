import { ADD_CART_ITEM, DELETE_CART_ITEM, EMPTY_CART } from '../actions/types';

export const cartReducer = (state = { itemIds: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM: {
      const itemId = action.payload;
      const existingItemIdIndex = state.itemIds.findIndex((id) => id === itemId);
      if (existingItemIdIndex >= 0) {
        return state;
      }
      return { itemIds: [itemId, ...state.itemIds] };
    }
    case DELETE_CART_ITEM: {
      const itemId = action.payload;
      const filteredItemIds = state.itemIds.filter((id) => id !== itemId);
      return { itemIds: filteredItemIds };
    }
    case EMPTY_CART:
      return { itemIds: [] };
    default: {
      return state;
    }
  }
};
