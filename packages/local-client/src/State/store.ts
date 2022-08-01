import {
  AnyAction,
  configureStore,
  Dispatch,
  Middleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./Reducers";
import { persistMiddleware } from "./Middlewares/persis-middlware";

let middleware: Middleware<{}, any, Dispatch<AnyAction>>[] = [
  thunk,
  persistMiddleware,
];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
}
export const store = configureStore({
  reducer: reducers,
  middleware: middleware,
});
