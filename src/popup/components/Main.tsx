import * as React from "react";
import { useState, useEffect } from "react";
import "firebase/auth";
import { auth, provider } from "../../background_script/firebase";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import WelcomeScreen from "../pages/WelcomeScreen";
import { getSyncStorage } from "../utils/sync-storage";
import AddNote from "./AddNote";

const Main = () => {
  const [currentUser, setcurrentUser] = React.useState<any>(null);
  const [loadComplete, setLoadComplete] = React.useState<boolean>(false);
  const [userDetails, setUserDetails] = React.useState<boolean>(false);
  const [repoName, setrepoName] = React.useState<string>("");
  const [Bname, setBName] = React.useState<string>("");
  const [WorkflowId, setWorkflowId] = React.useState<string>("");

  const getttingCredentials = async () => {
    const token = await getSyncStorage("AccessToken");
    const RepoName = await getSyncStorage("repoName");
    setrepoName(RepoName.repoName);
    const workflowId = await getSyncStorage("workflowId");
    setWorkflowId(workflowId.workflowId)
    const Branch = await getSyncStorage("Bname");
    setBName(Branch.Bname);
    console.log(token.AccessToken);
    console.log(RepoName.repoName);
    console.log(workflowId.workflowId);
    console.log(Branch.Bname);
    if (
      token.AccessToken.length &&
      RepoName.repoName.length &&
      workflowId.workflowId &&
      Branch.Bname.length != 0
    ) {
      setUserDetails(true);
    }
  };

  React.useEffect(() => {
    getttingCredentials();
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

  return (
    <div>
      {currentUser ? (
        userDetails ? (
          <AddNote Bname={Bname} workflowId={WorkflowId}  repoName={repoName} />
        ) : (
          <MainPage />
        )
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Main;
