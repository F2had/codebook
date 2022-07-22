import { useEffect } from "react";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizeable from "./Resizable";

import { Cell } from "../Types";
import { useActions } from "../Hooks/useActions";
import { useTypedSelector } from "../Hooks/UsedTypedSelector";
import "./CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector((state) => {
    if (state.bundles) {
      return state.bundles[cell.id];
    }
  });

  const cells = useTypedSelector((state) => {
    if (state.cells) {
      return state.cells;
    }
  });

  const joinCellsCode = (cells: any) => {
    const { data, order } = cells;
    const orderedCells = order.map((id: string) => data[id]);
    const cumulativeCode = [];
    const showFuncNoop = 'var show = () => {}';
    const showFunc = [
      `
      import _React from "react";
      import _ReactDOM from "react-dom";
      const root = document.getElementById("root");
      var show = (value) => {
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
      `,
    ];
    for (const c of orderedCells) {
      if (c.type === "code") {
        if(c.id === cell.id)
        {
          cumulativeCode.push(showFunc);
        }
        else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }

      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  };

  useEffect(() => {
    if (!bundle) {
      const cumulativeCode = joinCellsCode(cells);
      createBundle(cell.id, cumulativeCode.join("\n"));
      return;
    }
    const timer = setTimeout(() => {
      const cumulativeCode = joinCellsCode(cells);
      createBundle(cell.id, cumulativeCode.join("\n"));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, createBundle, cells]);

  return (
    <Resizeable direction="vertical" width={Infinity} height={300}>
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizeable direction="horizontal" width={Infinity} height={300}>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizeable>
        <div className="progress-wrapper">
          {!bundle || bundle.isBundling ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizeable>
  );
};

export default CodeCell;
