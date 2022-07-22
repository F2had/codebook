import { Dispatch } from "redux";
import { CellType, CellDirection } from "../../Types/index";
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

export const createBundle =  (cellId: string, input: string) => {
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
