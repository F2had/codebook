import React from "react";

import { Cell } from "../Types";
import ActionBar from "./ActionBar";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import "./CellListItem.css";
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  switch (cell.type) {
    case "code":
      child = (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      );
      break;
    case "markdown":
      child = (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <TextEditor cell={cell} />
        </>
      );
      break;
    default:
      child = <div>Unknown cell type</div>;
      break;
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
