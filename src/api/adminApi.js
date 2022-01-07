import errorParser from './helpers.js/errorParser';
import authHeader from './helpers.js/authHeader';

const API_URL = 'https://skylight-photography.herokuapp.com/';

const addPhoto = async (imageFile, title, description, price) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price);

  console.log(authHeader());

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

const adminApi = {
  addPhoto,
};

export default adminApi;
