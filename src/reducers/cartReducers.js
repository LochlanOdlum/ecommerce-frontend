import { ADD_CART_ITEM, DELETE_CART_ITEM } from '../actions/types';

export const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ADD_CART_ITEM: {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem) {
        return { items: [...state.items] };
      }
      return { items: [{ id: itemId }, ...state.items] };
    }
    case DELETE_CART_ITEM: {
      const itemId = action.payload;
      const filteredItems = state.items.filter((item) => item.id !== itemId);
      return { items: filteredItems };
    }
    default: {
      return state;
    }
  }
};
