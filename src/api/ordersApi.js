import { makeRequest } from '../util/util.js';
import { API_URL } from '../util/config';
import { getAuthHeader, errorParser } from '../util/util';
import { saveAs } from 'file-saver';

export const startOrderRequest = async (customerEmail, customerName, itemIds) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerEmail,
      customerName,
      itemIds,
    }),
  };

  return await makeRequest('/shop/startOrder', requestOptions);
};

export const fetchOrdersRequest = async () => {
  return await makeRequest('/shop/myorders');
};

export const fetchOrderRequest = async (orderId) => {
  return await makeRequest(`/shop/myorder/${orderId}`);
};

export const downloadImage = async (key) => {
  const { url } = await makeRequest(`/shop/photoTempURL/${key}`);

  // const a = document.createElement('a');
  // a.style.display = 'none';
  // a.href = url;
  // document.body.appendChild(a);
  // console.log('clicking download');
  // a.click();

  console.log('saving url');
  saveAs(url);

  // saveAs(blob, filename);

  // const requestOptions = {
  //   method: 'GET',
  //   headers: {
  //     ...getAuthHeader(),
  //   },
  // };

  // const res = await fetch(`${API_URL}/shop${path}`, requestOptions);

  // errorParser(res, { message: 'Could not download image' });

  // const blob = await res.blob();

  // const objectURL = URL.createObjectURL(blob);
  // const a = document.createElement('a');
  // a.style.display = 'none';
  // a.href = objectURL;
  // // the filename you want
  // a.download = filename;
  // document.body.appendChild(a);
  // a.click();
  // window.URL.revokeObjectURL(objectURL);
  // // saveAs(blob, filename);
};

export const fetchSecureImageRequest = async (path) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      ...getAuthHeader(),
    },
  };

  const res = await fetch(`${API_URL}/shop${path}`, requestOptions);

  errorParser(res, { message: 'Could not download image' });

  const blob = await res.blob();

  return URL.createObjectURL(blob);
};
