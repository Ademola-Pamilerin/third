import React,{ useRef, useImperativeHandle } from "react";
import classes from "./input.module.css";
const InputCreator = React.forwardRef((props,ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      activate: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.valid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.changed}
        onBlur={props.blur}
      />
    </div>
  );
});
export default InputCreator;
