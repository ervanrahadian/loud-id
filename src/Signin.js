import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Signin.css";

function Signin() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="signin">
      <div className="logo">
        <div className="signin_logo">
          <span className="logo_1">Loud</span>
          <span className="logo_2">.</span>
          <span className="logo_3">id</span>
        </div>
        <div className="signin_logo2">
          <span className="logo_4">Obrolan Grup Indonesia</span>
        </div>
      </div>
      <Button onClick={signIn}>Masuk</Button>
    </div>
  );
}

export default Signin;
