import { FC, useRef } from "react";
import MoancoEditor from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./code-editor.css";
import "./syntax.css";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}



const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };
  const onFormatClick = () => {
    const value = editorRef.current.getValue();

    const formatted = prettier
      .format(value, {
        parser: "babel",
        plugins: [parser],
        trailingComma: "all",
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
      })
      .replace(/\n$/g, "");

    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button-format button is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MoancoEditor
        value={initialValue}
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        onChange={(value) => onEditorChange(value)}
        options={{
          tabSize: 2,
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        language="javascript"
        theme="vs-dark"
        height="100%"
      />
    </div>
  );
};

export default CodeEditor;
