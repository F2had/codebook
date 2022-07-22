import { combineReducers } from "redux";
import CellsReducer from "./CellsReducer";
import BundleReducer from "./BundleReducer";

const reducers = combineReducers({
    cells: CellsReducer,
    bundles: BundleReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;