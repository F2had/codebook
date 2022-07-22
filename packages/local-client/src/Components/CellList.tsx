import React, { Fragment } from "react";

import { useTypedSelector } from "../Hooks/UsedTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    if (state.cells) {
      const { data, order } = state.cells;
      return order.map((id) => data[id]);
    }
    return [];
  });

  const renderCellList = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellListItem cell={cell} />
        <AddCell previousCellId={cell.id} />
      </Fragment>
    );
  });
  return (
    <>
      <AddCell forceVisable={!cells.length} previousCellId={null} />
      {renderCellList}
    </>
  );
};

export default CellList;
