import * as React from "react";
import { useState, useEffect } from "react";
import "firebase/auth";
import { auth, provider } from "../../background_script/firebase";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import WelcomeScreen from "./WelcomeScreen";

const Main = () => {
  const [currentUser, setcurrentUser] = React.useState<any>(null);
  const [loadComplete, setLoadComplete] = React.useState<boolean>(false);

  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      if (!loadComplete) { 
        setTimeout(() => {
          setLoadComplete(true);
        }, 50);
      }
      setcurrentUser(user);
    });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  if (!loadComplete) {
    return <WelcomeScreen />;
  }

  return <div>{!currentUser ? <LoginPage /> : <MainPage />}</div>;
};

export default Main;
