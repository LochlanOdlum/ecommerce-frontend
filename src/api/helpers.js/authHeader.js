import { store } from '../../index';

export default () => {
  const userToken = store.getState().auth.token;

  return userToken ? { Authorization: `Bearer ${userToken}` } : {};
};
