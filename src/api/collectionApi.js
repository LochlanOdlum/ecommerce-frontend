import errorParser from './helpers.js/errorParser';

const API_URL = 'https://skylight-photography.herokuapp.com/shop/';

const fetchCollections = async () => {
  const requestOptions = {
    method: 'GET',
  };

  const res = await fetch(`${API_URL}collections`, requestOptions);
  const collections = await res.json();

  errorParser(res, collections);

  return collections;
};

const collectionApi = {
  fetchCollections,
};

export default collectionApi;
