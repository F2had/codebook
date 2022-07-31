import produce from "immer";

import { Cell } from "../../Types/index";
import { ActionType } from "../Actions/Types";
import { Action } from "../Actions";

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: { [id: string]: Cell };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const CellsReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const currentIndex = state.order.indexOf(action.payload.id);
        const newIndex =
          direction === "up" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex < 0 || newIndex >= state.order.length) {
          return state;
        }
        state.order[currentIndex] = state.order[newIndex];
        state.order[newIndex] = action.payload.id;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload.id];
        state.order = state.order.filter((id) => id !== action.payload.id);
        return state;
      case ActionType.UPDATE_CELL:
        const { content } = action.payload;
        state.data[action.payload.id].content = content;
        return state;
      case ActionType.INSERT_CELL_AFTER:
        const { type } = action.payload;

        let newId = randomId();
        while (checkIDExists(newId, state)) {
          newId = randomId();
        }
        const newCell: Cell = {
          id: newId,
          type,
          content:
            type === "code"
              ? `// you can use the show function to show js/jsx in a cell \n //show(<div>Hello World</div>)`
              : "",
        };
        state.data[newId] = newCell;
        const index = state.order.indexOf(
          action.payload.id ? action.payload.id : ""
        );

        if (index === -1) {
          state.order.unshift(newId);
        } else {
          state.order.splice(index + 1, 0, newId);
        }
        return state;

      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;

        return state;
      case ActionType.FETCH_CELLS_COMPLETE:
        state.loading = false;

        state.data = action.payload.reduce(
          (acc, cell) => ({ ...acc, [cell.id]: cell }),
          {} as CellsState["data"]
        );
        state.order = action.payload.map((cell) => cell.id);
        return state;

      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;

      case ActionType.SAVE_ERROR_CELL:
        state.error = action.payload;
        return state;

      default:
        return state;
    }
  }
);

const randomId = () => Math.random().toString(36).substring(2, 5);
const checkIDExists = (id: string, state: CellsState) => {
  return state.data[id] !== undefined;
};
export default CellsReducer;
