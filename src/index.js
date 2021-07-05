import React from "react";
import ReactDOM from "react-dom";
import ButtonArray from "./ButtonArray";
import TagsInput from "./TagsInput";

function InputFieldWithChip() {
  const [theArray, setTheArray] = React.useState([]);
  function handleSelecetedTags(items) {
    setTheArray(items);
  }
  return (
    <div className="App">
      <TagsInput
        fullWidth
        selectedTags={handleSelecetedTags}
        variant="outlined"
        id="tags"
        name="tags"
        placeholder="add Email tags"
        label="Email tags"
      />
      <ButtonArray
        textProps={{
          style: { fontWeight: "500", fontFamily: "sans-serif" },
          props: {
            id: "result",
          },
        }}
        buttonProps={{
          style: { background: "tomato" },
          id: "btnShow",
          variant: "contained",
        }}
      >
        {theArray}
      </ButtonArray>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<InputFieldWithChip />, rootElement);
