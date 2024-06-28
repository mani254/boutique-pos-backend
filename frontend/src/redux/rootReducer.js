import { combineReducers } from "redux";

import adminReducer from "./admin/adminReducer";
import modalReducer from "./modal/modalReducer";
import notificationReducer from "./notification/notificationReducer";
import categoryReducer from "./categories/categoryReducer";

const rootReducer = combineReducers(
   {
      admin: adminReducer,
      modal: modalReducer,
      notification: notificationReducer,
      category: categoryReducer
   }
);


export default rootReducer;