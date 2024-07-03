import * as types from './adminActionTypes.js';
import axios from "axios";
import { showNotification } from '../notification/notificationActions.js';

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



export const adminLogin = (logInDetails) => {
   return async (dispatch) => {
      dispatch(signInStart());
      try {
         const res = await axios.post(`${process.env.REACT_APP_BACKENDURI}/api/auth/loginAdmin`, logInDetails);
         dispatch(signInSuccess(res.data.admin));
         localStorage.setItem("adminAuthToken", res.data.token);
         return Promise.resolve();
      } catch (err) {
         dispatch(signInFailure(err.response ? err.response.data.error : "Network Error"));
         return Promise.reject(err);
      }
   };
};

export const initialSignIn = (token) => {
   return async (dispatch) => {
      dispatch(signInStart());
      try {
         const res = await axios.post(`/api/auth/initialLogin`, { token });
         dispatch(signInSuccess(res.data));
         return Promise.resolve();
      } catch (err) {
         dispatch(signInFailure(err.response ? err.response.data.error : "Network Error"));
         return Promise.reject(err);
      }
   };
};

export const addAdmin = (adminDetails) => {
   return async (dispatch) => {
      dispatch({ type: types.ADD_ADMIN });



      try {
         const response = await axios.post(`${process.env.REACT_APP_BACKENDURI}/api/admins`, adminDetails);
         if (response) {
            dispatch(addAdminSuccess(response.data.admin));
            dispatch(showNotification('Admin Added Successfully'));
         }
      } catch (err) {
         dispatch(addAdminFailure(err.response ? err.response.data.error : "Network Error"));
         dispatch(showNotification(err.response ? err.response.data.error : "Network Error"));
         return Promise.reject(err.response ? err.response.data.error : "Network Error");
      }
   };
};

export const addAdminSuccess = (admin) => ({
   type: types.ADD_ADMIN_SUCCESS,
   payload: admin
});

export const addAdminFailure = (error) => ({
   type: types.ADD_ADMIN_FAILURE,
   payload: error
});

export const getAdmins = () => {
   return async (dispatch) => {
      dispatch({ type: types.GET_ADMINS });
      try {
         const response = await axios.get(`${process.env.REACT_APP_BACKENDURI}/api/admins`);
         dispatch(getAdminsSuccess(response.data.admins));

         return Promise.resolve(response.data.admins);
      } catch (err) {
         dispatch(getAdminsFailure(err.message));
         return Promise.reject(err);
      }
   };
};

export const getAdminsSuccess = (admins) => ({
   type: types.GET_ADMINS_SUCCESS,
   payload: admins
});

export const getAdminsFailure = (error) => ({
   type: types.GET_ADMINS_FAILURE,
   payload: error
});

export const updateAdmin = (adminDetails) => {
   return async (dispatch) => {
      dispatch({ type: types.UPDATE_ADMIN });

      try {
         const response = await axios.put(`${process.env.REACT_APP_BACKENDURI}/api/admins/${adminDetails._id}`, adminDetails);
         if (response) {
            dispatch(updateAdminSuccess(response.data.admin));
            dispatch(showNotification('Admin Updated Successfully'));
         }
      } catch (err) {
         dispatch(updateAdminFailure(err.response ? err.response.data.error : "Network Error"));
         dispatch(showNotification(err.response ? err.response.data.error : "Network Error"));
         return Promise.reject(err.response ? err.response.data.error : "Network Error");
      }
   };
};

export const updateAdminSuccess = (admin) => ({
   type: types.UPDATE_ADMIN_SUCCESS,
   payload: admin
});

export const updateAdminFailure = (error) => ({
   type: types.UPDATE_ADMIN_FAILURE,
   payload: error
});

export const deleteAdmin = (adminId) => {
   return async (dispatch) => {
      dispatch({ type: types.DELETE_ADMIN });

      try {
         const response = await axios.delete(`${process.env.REACT_APP_BACKENDURI}/api/admins/${adminId}`);
         if (response) {
            dispatch(deleteAdminSuccess(adminId));
            dispatch(showNotification('Admin deleted Successfully'));
         }
      } catch (err) {
         dispatch(deleteAdminFailure(err.response ? err.response.data.error : "Network Error"));
         dispatch(showNotification(err.response ? err.response.data.error : "Network Error"));
         return Promise.reject(err.response ? err.response.data.error : "Network Error");
      }
   };
};

export const deleteAdminSuccess = (adminId) => ({
   type: types.DELETE_ADMIN_SUCCESS,
   payload: adminId
});

export const deleteAdminFailure = (error) => ({
   type: types.DELETE_ADMIN_FAILURE,
   payload: error
});

