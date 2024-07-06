// adminReducer.js
import * as types from "./adminActionTypes";

const initialState = {
   isLoggedIn: false,
   admins: [],
   loading: false,
   error: null,
   token: localStorage.getItem("adminAuthToken"),
};

const adminReducer = (state = initialState, action) => {
   switch (action.type) {
      case types.GET_ADMINS_SUCCESS:
         return {
            ...state,
            admins: action.payload,
            loading: false,
            error: null,
         };
      case types.GET_ADMINS_FAILURE:
         return {
            ...state,
            error: action.payload,
            loading: false,
         };
      case types.ADD_ADMIN_SUCCESS:
         return {
            ...state,
            admins: [...state.admins, action.payload],
            loading: false,
            error: null,
         };
      case types.ADD_ADMIN_FAILURE:
         return {
            ...state,
            error: action.payload,
            loading: false,
         };
      case types.UPDATE_ADMIN_SUCCESS:
         return {
            ...state,
            admins: state.admins.map(admin =>
               admin._id === action.payload._id ? action.payload : admin
            ),
            loading: false,
            error: null,
         };
      case types.UPDATE_ADMIN_FAILURE:
         return {
            ...state,
            error: action.payload,
            loading: false,
         };
      case types.DELETE_ADMIN_SUCCESS:
         return {
            ...state,
            admins: state.admins.filter(admin => admin._id !== action.payload),
            loading: false,
            error: null,
         };
      case types.DELETE_ADMIN_FAILURE:
         return {
            ...state,
            error: action.payload,
            loading: false,
         };
      default:
         return state;
   }
};

export default adminReducer;
