import { makeRequest } from '../util/util.js';

export const fetchCollectionsRequest = async () => {
  return await makeRequest('/shop/collections');
};
