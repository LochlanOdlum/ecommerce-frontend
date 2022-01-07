import authHeader from './helpers.js/authHeader';
import errorParser from './helpers.js/errorParser';

const API_URL = 'https://skylight-photography.herokuapp.com/shop/';

const startOrder = async (itemIds) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify({
      itemIds,
    }),
  };
  const res = await fetch(`${API_URL}startOrder`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return { clientSecret: data.clientSecret, orderId: data.orderId };
};

const fetchOrders = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
    },
  };

  const res = await fetch(`${API_URL}myOrders`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data.orders;
};

const fetchOrder = async (orderId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...authHeader(),
    },
  };

  const res = await fetch(`${API_URL}myOrder/${orderId}`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data.order;
};

const ordersApi = {
  startOrder,
  // orderSuccess,
  fetchOrders,
  fetchOrder,
};

export default ordersApi;
