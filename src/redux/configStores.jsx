import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userMovie from "./userMovie/userMovie";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import productMovie from "./productMovie/productMovie";


const persistConfig = {
  key: "data",
  storage,
//   blacklist:['userRegister']
};
export const rootReducers = combineReducers({
  userMovie,
  productMovie

  
})
const persistedReducer = persistReducer(persistConfig,rootReducers);
export const store = configureStore({
  reducer:{persistedReducer},
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);
