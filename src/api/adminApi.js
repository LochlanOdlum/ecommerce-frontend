import errorParser from './helpers.js/errorParser';
import authHeader from './helpers.js/authHeader';

const API_URL = 'https://skylight-photography.herokuapp.com/';

// TODO: Better way of handling failed requests than with errorparser? Just seems a bit odd.

const addPhoto = async (imageFile, photoTitle, photoDescription, priceInPence, collectionId) => {
  const formData = new FormData();

  formData.append('image', imageFile);
  formData.append('title', photoTitle);
  formData.append('collectionId', collectionId);
  formData.append('description', photoDescription);
  formData.append('priceInPence', priceInPence);

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

const editPhoto = async (photoId, editedFields) => {
  console.log(photoId);
  console.log(editedFields);
  //Destructure to ensure only the correct fields get sent in request.
  const { orderPosition, imageFile, photoTitle, photoDescription, priceInPence, collectionId } = editedFields;

  const formData = new FormData();

  formData.append('image', imageFile);
  formData.append('orderPosition', orderPosition);
  formData.append('title', photoTitle);
  formData.append('collectionId', collectionId);
  formData.append('description', photoDescription);
  formData.append('priceInPence', priceInPence);

  const requestOptions = {
    method: 'PATCH',
    headers: { ...authHeader() },
    body: formData,
  };

  const response = await fetch(`${API_URL}admin/photo/${photoId}`, requestOptions);

  const data = response.json();

  errorParser(response, data);

  return data;
};

const deletePhoto = async (photoId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader() },
  };

  const res = await fetch(`${API_URL}admin/photo/${photoId}`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data;
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

const editCollection = async (collectionId, editedFields) => {
  const { updatedCollectionName } = editedFields;

  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ updatedCollectionName }),
  };

  const res = await fetch(`${API_URL}admin/collection/${collectionId}`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

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

const getRecentOrders = async (limit) => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader() },
  };

  const res = await fetch(`${API_URL}admin/recentOrders${limit ? `?limit=${limit}` : ''}`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data;
};

const getOrderDetails = async (orderId) => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader() },
  };

  const res = await fetch(`${API_URL}admin/orderDetails/${orderId}`, requestOptions);

  const data = await res.json();

  console.log(data);

  errorParser(res, data);

  return data;
};

const getUsers = async (page, resultsPerPage) => {
  return await getAdminData('users', page, resultsPerPage);
};

const getUserDetails = async (userId) => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader() },
  };

  const res = await fetch(`${API_URL}admin/userDetails/${userId}`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data;
};

const deleteUser = async (userId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader() },
  };

  const res = await fetch(`${API_URL}admin/user/${userId}`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data;
};

const getSummaryData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader() },
  };

  const res = await fetch(`${API_URL}admin/summaryDetails`, requestOptions);

  const data = await res.json();

  errorParser(res, data);

  return data;
};

const adminApi = {
  addPhoto,
  getPhotos,
  editPhoto,
  deletePhoto,
  postCollection,
  editCollection,
  getOrders,
  getOrderDetails,
  getUsers,
  getUserDetails,
  deleteUser,
  getSummaryData,
  getRecentOrders,
};

export default adminApi;
