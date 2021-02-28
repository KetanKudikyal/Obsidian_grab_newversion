import * as React from "react";
import { useState, useEffect } from "react";
import "firebase/auth";
import { auth, provider } from "../background_script/firebase";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";

const App = () => {
  const [currentUser, setcurrentUser] = React.useState<any>(null);

  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      let tokenn = localStorage.getItem("accesstoken");
      console.log(tokenn);
    });
    return function () {
      unregisterAuthObserver();
    };
  }, []);

  console.log(currentUser);

  return <div>{currentUser ? <MainPage /> : <LoginPage />}</div>;
};

export default App;
