import errorParser from './helpers.js/errorParser';
import authHeader from './helpers.js/authHeader';

const API_URL = 'https://skylight-photography.herokuapp.com/';

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

const getUsers = async (page, resultsPerPage) => {
  return await getAdminData('users', page, resultsPerPage);
};

const adminApi = {
  addPhoto,
  editPhoto,
  postCollection,
  getPhotos,
  getOrders,
  getUsers,
  editCollection,
};

export default adminApi;
