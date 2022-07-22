import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import "./TextEditor.css";
import { Cell } from "../Types";
import { useActions } from "../Hooks/useActions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }

      setEditing(false);
    };
    window.addEventListener("click", listener, { capture: true });
    return () => {
      window.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing)
    return (
      <div ref={ref} className="text-editor card">
        <div className="card-content">
          <MDEditor
            value={cell.content}
            onChange={(value) => {
              updateCell(cell.id, value as string);
            }}
          />
        </div>
      </div>
    );

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown
        className="text-editor"
        source={cell.content || "Click to edit"}
      />
    </div>
  );
};

export default TextEditor;
