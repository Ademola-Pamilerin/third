import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth";
import InputCreator from "../Input/input";

const emailDispatcher = (state, action) => {
  if (action.type === "CHANGE_EMAIL") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "BLUR_EMAIL") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordDispatcher = (state, action) => {
  if (action.type === "SET_USER_PASSWORD") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "BLUR_PASSWORD") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [userEmail, dispatchUserEmail] = useReducer(emailDispatcher, {
    value: "",
    isValid: null,
  });
  const [userPassword, dispatchUserPassword] = useReducer(passwordDispatcher, {
    value: "",
    isValid: null,
  });
  const emailValid = userEmail.isValid;
  const passwordValid = userPassword.isValid;
  const emailRef = useRef();
  const passwordRef = useRef();

  //side e👩🏼‍🦱ffect
  useEffect(() => {
    console.log(userEmail);
    const time = setTimeout(() => {
      console.log("timeOut");
      console.log(emailValid, passwordValid, formIsValid);
      setFormIsValid(emailValid && passwordValid);
    }, 500);
    return () => {
      console.log("updating");
      clearTimeout(time);
    };
  }, [passwordValid, emailValid]);
  const emailChangeHandler = (event) => {
    dispatchUserEmail({ type: "CHANGE_EMAIL", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchUserPassword({
      type: "SET_USER_PASSWORD",
      value: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchUserEmail({ type: "BLUR_EMAIL", val: userEmail.value });
  };

  const validatePasswordHandler = () => {
    dispatchUserPassword({ type: "BLUR_PASSWORD", value: userPassword.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.login(userEmail.value, userPassword.value);
    } else if (!emailValid) {
      console.log("Name is Ademola")
      emailRef.current.activate();
    } else {
      console.log("Name is Philips")
      passwordRef.current.activate();
    }
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputCreator
          type="email"
          id="email"
          label={"E-mail"}
          value={userEmail.value}
          changed={emailChangeHandler}
          blur={validateEmailHandler}
          valid={emailValid}
          ref={emailRef}
        />
        <InputCreator
          ref={passwordRef}
          isValid={passwordValid}
          label={"Password"}
          type="password"
          id="password"
          value={userPassword.value}
          changed={passwordChangeHandler}
          blur={validatePasswordHandler}
          valid={userPassword.isValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
