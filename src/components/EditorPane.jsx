import React from 'react';
import Editor from '@monaco-editor/react';

const EditorPane = ({ height = '100%', theme = 'codeify-dark', language, value, onChange, onMount, options }) => {
  return (
    <div className="flex-1">
      <Editor 
        height={height}
        theme={theme}
        language={language}
        value={value}
        onChange={onChange}
        onMount={onMount}
        options={options}
      />
    </div>
  );
};

export default EditorPane;


