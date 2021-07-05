import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0),
  },
  span: {
    margin: theme.spacing(0, 2),
  },
}));

export default function ButtonArray({ ...props }) {
  const classes = useStyles();
  const { textProps, buttonProps } = props;
  const [theDisplay, setTheDisplay] = React.useState("none");
  const [btnText, setBtnText] = React.useState("mostrar array de tags");
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
    <>
      <Button
        color="primary"
        className={classes.button}
        onClick={handleShow}
        {...buttonProps}
      >
        {btnText}
      </Button>
      <span
        className={classes.span}
        style={{
          display: theDisplay,
          ...textProps.style,
        }}
        {...textProps.props}
      >
        {props.children}
      </span>
    </>
  );
}
ButtonArray.defaultProps = {
  textProps: [],
  array: [],
};
ButtonArray.propTypes = {
  showButton: PropTypes.array,
  textProps: PropTypes.object,
  buttonProps: PropTypes.object,
};
