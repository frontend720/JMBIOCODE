import React, { useState } from "react";
import { app } from "./config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import "./AuthScreen.css";
import google from "./google.svg"

export default function AuthScreen() {
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState("");

  function createUser(e) {
    e.preventDefault();
    const userRef = createUserWithEmailAndPassword(auth, email, password);
    userRef
      .then((user) => {
        if (user.providerId !== null) {
          console.log("User already exists.");
        } else {
          console.log(user.user.email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function returningUser(e) {
    e.preventDefault();
    const userRef = signInWithEmailAndPassword(auth, email, password);
    userRef
      .then((user) => {
        if (user.user !== email) {
          console.log("User does not exist, try again.");
        } else {
          console.log(user.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

const authSwitch = () => {
    setToggle(prev => !prev)
}

  return (
    <div className="auth_container">
      <form onSubmit={toggle ? returningUser : createUser} action="" className="auth_form">
        <h1 className="auth_title">The Ion Exchange</h1>{" "}
        <h2 className="title_description">Bond Over Elements</h2>{" "}
        <input
          className="auth_inputs"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth_inputs"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="auth_button">{toggle ? "Login" : "Signup"}</button>
        <label onClick={authSwitch} style={{textAlign: "right", padding: "12px 0px"}} htmlFor="">{toggle ? "New" : "Returning"} Users.</label>
      </form>
      <button className="google_auth_button">
        <img src={google} alt="" />
        <label htmlFor="">Sign in with Google</label>
      </button>
    </div>
  );
}
