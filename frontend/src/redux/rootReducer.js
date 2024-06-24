import { combineReducers } from "redux";

import adminReducer from "./admin/adminReducer";
import modalReducer from "./modal/modalReducer";
import notificationReducer from "./notification/notificationReducer";

const rootReducer = combineReducers(
   {
      admin: adminReducer,
      modal: modalReducer,
      notification: notificationReducer
   }
);


export default rootReducer;