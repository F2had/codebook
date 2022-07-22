import {
  AnyAction,
  configureStore,
  Dispatch,
  Middleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./Reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

let middleware: Middleware<{}, any, Dispatch<AnyAction>>[] = [thunk];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
}
export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

export const persistor = persistStore(store);
