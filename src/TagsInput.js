import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "flex",
    width: "unset",
  },
  inputDiv: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(0.2, 1),
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  span: {
    margin: theme.spacing(0, 2),
  },
}));

export default function TagsInput({ ...props }) {
  const classes = useStyles();
  const { placeholder, tags, ...other } = props;
  const [inputValue, setInputValue] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorDuplicated, setErrorDuplicated] = React.useState(false);
  const [theDisplay, setTheDisplay] = React.useState("none");
  const [btnText, setBtnText] = React.useState("mostrar array de tags");
  const [selectedItem, setSelectedItem] = React.useState([]);
  const mailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  function handleKeyDown(event) {
    //Array de e-mails para teste: abc@abx.sa;acb@asx.com;sdkosso@sdw.br;sodkwiiii@iii.br;sssoo@kaiw.us;teps@tops.mega
    if (event.key === "Enter" || event.keyCode === 9) {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim().split(";")
      );

      event.preventDefault();

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;
      event.target.value
        .trim()
        .split(";")
        .map((data) => {
          return !data.match(mailRegex)
            ? setErrorEmail(true)
            : newSelectedItem.indexOf(data) !== -1
            ? setErrorDuplicated(true)
            : newSelectedItem.push(data);
        });
      setSelectedItem(newSelectedItem);
      setInputValue("");
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      setErrorEmail(false);
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event) {
    setErrorEmail(false);
    setInputValue(event.target.value);
  }

  const handleShow = () => {
    setTheDisplay(
      theDisplay === "none"
        ? "flex"
        : theDisplay === "flex"
        ? "none"
        : theDisplay
    );
    setBtnText(
      btnText === "mostrar array de tags"
        ? "esconder array de tags"
        : btnText === "esconder array de tags"
        ? "mostrar array de tags"
        : btnText
    );
  };

  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
              <TextField
                error={errorEmail === true || errorDuplicated === true}
                helperText={
                  errorEmail === true && errorDuplicated === false
                    ? "Pelo menos um e-mail digitado é inválido"
                    : errorDuplicated === true && errorEmail === false
                    ? "Pelo menos um e-mail digitado já é uma tag"
                    : errorDuplicated === true && errorEmail === true
                    ? "Pelo menos um e-mail digitado já é uma tag e pelo menos um outro e-mail é inválido"
                    : null
                }
                inputProps={{
                  className: classes.input,
                  type: "email",
                  size: inputValue.length,
                }}
                InputProps={{
                  className: classes.inputDiv,
                  startAdornment: selectedItem.map((item) => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        onClick={handleShow}
      >
        {btnText}
      </Button>
      <span className={classes.span} style={{ display: theDisplay }}>
        {selectedItem.join(" - ")}
      </span>
    </React.Fragment>
  );
}
TagsInput.defaultProps = {
  tags: [],
};
TagsInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};
