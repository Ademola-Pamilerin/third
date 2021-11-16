import React, { useRef, useImperativeHandle } from "react";
import classes from "./input.module.css";
const Input = React.forwardRef((props, ref) => {
  let inputs = null;
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  switch (props.type) {
    case "password":
      inputs = (
        <input
          ref={inputRef}
          type={"password"}
          id={props.id}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blur}
          className={props.valid ? "" : classes.invalid}
        />
      );
      break;
    case "email":
      inputs = (
        <input
          ref={inputRef}
          type={"email"}
          id={props.id}
          value={props.value}
          onChange={props.changed}
          onBlur={props.blur}
          className={props.valid ? "" : classes.invalid}
        />
      );
      break;
    default:
      break;
  }
  return <>{inputs}</>;
});
export default Input;
