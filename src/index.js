import React from "react";
import ReactDOM from "react-dom";
import TagsInput from "./TagsInput";

function InputFieldWithChip() {
  return (
    <div className="App">
      <TagsInput
        fullWidth
        variant="outlined"
        id="tags"
        name="tags"
        placeholder="add Email tags"
        label="Email tags"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<InputFieldWithChip />, rootElement);
