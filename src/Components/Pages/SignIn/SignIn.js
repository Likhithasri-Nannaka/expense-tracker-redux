import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Form from "../../Layout/UI/Form";
import { AuthActions } from "../../Store/AuthReducer";

const SignIn = () => {
  const emailRef = useRef("");
  const pswdRef = useRef("");

  const history = useHistory("");

  const dispatch = useDispatch();

  const signInSubmitHandler = async (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const pswdValue = pswdRef.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAle_pud5CBSRmol4VktTQSBgmBbnu0ZzQ",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailValue,
          password: pswdValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(data.email);

      emailRef.current.value = "";
      pswdRef.current.value = "";

      dispatch(AuthActions.login({ email: data.email, idToken: data.idToken }));

      history.replace("/expenses");
    } else {
      alert(data.error.message);
    }
  };
  return (
    <React.Fragment>
      <Form onSubmit={signInSubmitHandler}>
        <div>
          <h3>Sign In</h3>
        </div>
        <div>
          <input
            id="emailId"
            placeholder="Email"
            type="text"
            ref={emailRef}
          ></input>
          <input
            id="passwordId"
            placeholder="Password"
            type="password"
            ref={pswdRef}
          />
        </div>
        <button>Sign In</button>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </Form>
    </React.Fragment>
  );
};

export default SignIn;