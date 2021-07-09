import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "./loginStyles.css";
import "firebase/app";
import firebase from "firebase/app";
import { auth } from "./../../Firebase/firebase";

const Login = () => {
  return (
    <div id="login-page">
      <div id="loginForm">
        <div className="login-content">
          <div className="content">
            <h2
              style={{
                fontFamily: "Franklin Gothic Medium",
                marginBottom: "5px",
              }}
            >
              Welcome to
            </h2>

            <h1>Chatify!</h1>
          </div>

          <div className="icons">
            <button
              className="login-button"
              onClick={() =>
                auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
              }
            >
              <GoogleOutlined />
              <span style={{ marginLeft: "10px" }} />
              Login with Google
            </button>
          </div>

          {/* <button>
            <FacebookOutlined />
            Login with Facebook
          </button> */}
        </div>
      </div>
      <div className="image-div"></div>
    </div>
  );
};

export default Login;
