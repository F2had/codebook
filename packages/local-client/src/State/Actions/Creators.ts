import { Dispatch } from "redux";
import axios from "axios";
import { RootState } from "../Reducers";
import { CellType, CellDirection, Cell } from "../../Types/index";
import { ActionType } from "./Types";
import {
  Action,
  MoveCellAction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  BundleStartAction,
  BundleCompleteAction,
} from ".";
import bundle from "../../Bundler/index";
import { CellsState } from "../Reducers/CellsReducer";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      id,
    },
  };
};
export const moveCell = (
  id: string,
  direction: CellDirection
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (
  id: string | null,
  type: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const bundleStart = (
  cellId: string,
  input: string
): BundleStartAction => {
  return {
    type: ActionType.BUNDLE_START,
    payload: {
      cellId,
      input,
    },
  };
};

export const bundleComplete = (
  cellId: string,
  bundle: { code: string; err: string }
): BundleCompleteAction => {
  return {
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      cellId,
      bundle,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    await dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
        input,
      },
    });

    const results = await bundle(input);

    await dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: results as { code: string; err: string },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_CELLS,
    });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    try {
      const { data, order } = getState().cells as CellsState;

      const cells = order.map((id: string) => data[id]);

      await axios.post("/cells", { cells });
    } catch (error: any) {
      dispatch({
        type: ActionType.SAVE_ERROR_CELL,
        payload: error.message,
      });
    }
  };
};
