import { store } from '../../index';

const authHeader = () => {
  const userToken = store.getState().auth.token;

  return userToken ? { Authorization: `Bearer ${userToken}` } : {};
};

export default authHeader;
