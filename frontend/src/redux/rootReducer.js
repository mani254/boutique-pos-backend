import { combineReducers } from "redux";

import adminReducer from "./admin/adminReducer";
import modalReducer from "./modal/modalReducer";
import notificationReducer from "./notification/notificationReducer";
import categoryReducer from "./categories/categoryReducer";
import storeReducer from "./stores/storeReducer";

const rootReducer = combineReducers(
   {
      admin: adminReducer,
      modal: modalReducer,
      notification: notificationReducer,
      category: categoryReducer,
      store: storeReducer,
   }
);


export default rootReducer;