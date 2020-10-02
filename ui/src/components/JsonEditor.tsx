import React, { FunctionComponent } from "react";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/monokai";

export interface JsonEditorProps {
  json: string;
  onChange?: (json: string) => void;
}

const htmlElementProps = { style: { height: "100%" } };

const JsonEditor: FunctionComponent<JsonEditorProps> = ({
  json,
  onChange,
}) => {
  return (
    <Editor
      htmlElementProps={htmlElementProps}
      value={JSON.parse(json)}
      onChange={onChange}
      ace={ace}
      theme="ace/theme/monokai"
      mode="code"
      navigationBar={false}
      statusBar={false}
      search={false}
    />
  );
};

export default JsonEditor;
