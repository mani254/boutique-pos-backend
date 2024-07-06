import * as types from './authActionTypes';
import axios from 'axios';

export const signInSuccess = (admin) => ({
   type: types.SIGN_IN_SUCCESS,
   payload: admin,
});

export const signInFailure = (error) => ({
   type: types.SIGN_IN_FAILURE,
   payload: error,
});

export const signInStart = () => ({
   type: types.SIGN_IN_START,
});

export const login = (logInDetails) => {
   return async (dispatch) => {
      dispatch(signInStart());
      try {
         const res = await axios.post(`${process.env.REACT_APP_BACKENDURI}/api/auth/login`, logInDetails);

         // Add detailed logging
         console.log('Response:', res);
         console.log('Response Data:', res.data);
         console.log('User Data:', res.data.user);

         // Check if res.data and res.data.user are defined
         if (res.data && res.data.user) {
            dispatch(signInSuccess(res.data));
            localStorage.setItem('token', res.data.token);
            return Promise.resolve(res.data);
         } else {
            throw new Error('Invalid response structure');
         }
      } catch (err) {
         console.error('Login error:', err);
         dispatch(signInFailure(err.response ? err.response.data.error : 'Network Error'));
         return Promise.reject(err);
      }
   };
};

export const initialLogin = (token) => {
   return async (dispatch) => {
      dispatch(signInStart());
      try {
         const res = await axios.post(`${process.env.REACT_APP_BACKENDURI}/api/auth/initiallogin`, { token });
         if (res.data && res.data.user) {
            dispatch(signInSuccess(res.data));
            return Promise.resolve(res.data);
         } else {
            throw new Error('Invalid response structure');
         }
      } catch (err) {
         console.error('Initial Login error:', err);
         dispatch(signInFailure(err.response ? err.response.data.error : 'Network Error'));
         return Promise.reject(err);
      }
   };
};

export const logout = () => ({
   type: types.LOGOUT
})