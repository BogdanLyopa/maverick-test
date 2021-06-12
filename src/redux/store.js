import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import customerReducer from "./customer/customerReducer";
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];
const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === "development",
});
const persistor = persistStore(store);
export default { store, persistor };
