import { store } from '../../index';
import { logout } from '../../actions/authActions';

const errorParser = (response, data) => {
  if (!response.ok) {
    //Server will give status 401 whenever there is no valid authentication
    //403 for when the user is authenticated but not authorized for endpoint
    if (response.status === 401) {
      return store.dispatch(logout());
    }

    throw new Error(data.message || data.errors || 'Unexpected error');
  }
};

export default errorParser;
