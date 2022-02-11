import errorParser from './helpers.js/errorParser';
import authHeader from './helpers.js/authHeader';

const API_URL = 'https://skylight-photography.herokuapp.com/';

const addPhoto = async (imageFile, title, description, price, collectionId) => {
  const formData = new FormData();
  console.log(price);
  formData.append('image', imageFile);
  formData.append('title', title);
  formData.append('collectionId', collectionId);
  formData.append('description', description);
  formData.append('priceInPounds', price);

  const response = await fetch(API_URL + 'admin/photo', {
    method: 'POST',
    headers: {
      ...authHeader(),
    },
    body: formData,
  });

  const data = await response.json();

  errorParser(response, data);
};

const postCollection = async (collectionName) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ collectionName }),
  };

  const response = await fetch(`${API_URL}admin/collection`, requestOptions);

  const data = await response.json();

  errorParser(response, data);

  return data;
};

const getAdminData = async (endpoint, page, resultsPerPage) => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader() },
  };

  const response = await fetch(
    `${API_URL}admin/${endpoint}?page=${page}&resultsPerPage=${resultsPerPage}`,
    requestOptions
  );

  const data = await response.json();

  errorParser(response, data);

  return data;
};

const getPhotos = async (page, resultsPerPage) => {
  return await getAdminData('photos', page, resultsPerPage);
};

const getOrders = async (page, resultsPerPage) => {
  return await getAdminData('orders', page, resultsPerPage);
};

const getUsers = async (page, resultsPerPage) => {
  return await getAdminData('users', page, resultsPerPage);
};

const adminApi = {
  addPhoto,
  postCollection,
  getPhotos,
  getOrders,
  getUsers,
};

export default adminApi;
