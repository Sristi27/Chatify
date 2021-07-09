import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "./../../Firebase/firebase";
import { useAuth } from "./../../contexts/AuthContext";
//we are export useContext(AuthContext) //hence we will get all the user data
//now we have that data from that componentn

import "./chatStyles.css";
import axios from "axios";
// const AuthContext = React.createContext();
// export const useAuth = () => useContext(AuthContext);

const Chat = () => {
  const history = useHistory();
  const { user } = useAuth();
  
    console.log(user) //an object
  // displayname,email we have this

  const [loading,setLoading]=useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    //files like images which are to be converted to binary form
    //here the blob contains image
    return new File([data], "userPhoto.jpg", { type: "/image.jpg" });
  };

  useEffect(() => {

    if (!user) {
      history.push("/");
      return;
    }

    //chat engine api call
    axios({
      url: "https://api.chatengine.io/users/me/",
      method: "get",
      headers: {
        "Project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
        "User-Name": user.email,
        "User-Secret": user.uid
      }
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch(() => {
        //executed when user is not created
        let formData = new FormData();
        formData.append("email", user.email);
        formData.append("username", user.email);
        formData.append("secret", user.uid);

        getFile(user.photoURL)
        .then((avatar) => {
          formData.append("avatar", avatar, avatar.name);
          //another api for creating new user
          axios.post('https://api.chatengine.io/users/',
            formData,
            {headers: {
              "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY
              // from chat engine
            }}
          )
            .then((res) => {
              console.log(res);
              setLoading(false)
            })
            .catch((err) => 
            {
                setLoading(false)
                alert(err.response)
            });
        });
      });
  }, [user,history]);



  if (!user || loading==true) 
  return (
    <div>
      <div className="loader">
        <h3>Loading...</h3>
      </div>
    </div>
  );

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div id="logo">Chatify</div>
        <div id="navActions">
          <button id="logoutBtn" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
      <ChatEngine
        height="92vh"
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
      />
      {/* header: 66px */}
    </div>
  );
};

export default Chat;
