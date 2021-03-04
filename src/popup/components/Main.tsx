import * as React from "react";
import { useState, useEffect } from "react";
import "firebase/auth";
import { auth, provider } from "../../background_script/firebase";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import { CircularProgress } from "@material-ui/core";


const Main = () => {
  const [currentUser, setcurrentUser] = React.useState<any>(null);
  const [loadComplete, setLoadComplete] = React.useState<boolean>(false);

  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (!loadComplete) {
        // Let's give user some time to enjoy the animation shall we?
        setTimeout(() => {
          setLoadComplete(true);
        }, 50);
      }
      setcurrentUser(user);
      let tokenn = localStorage.getItem("accesstoken");
      console.log(tokenn);
    });
    return function () {
      unregisterAuthObserver();
    };
  }, []);

  console.log(currentUser);

  if (!loadComplete) {
    return <CircularProgress />;
  }

  return <div>{!currentUser ? (<LoginPage/>) : <MainPage />}</div>;
};

export default Main;
