import * as React from "react";
import { Button, Card, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { provider, auth } from "../../background_script/firebase";
import firebase from "firebase";
import { getSyncStorage, setSyncStorage } from "../utils/sync-storage.js";
import { AppCredentials, useCred } from "../utils/useToken";
import { useState } from "react";
import { useContext } from "react";




const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    // placeItems: "center",
    height: "100vh",
  },
  button: {
    margin: theme.spacing(0.4),
    textTransform: "none",
    background: "#ffffff",
    "&:hover": {
      background: "#ffffff",
    },
  },
  image: {
    height: "20px",
    marginRight: theme.spacing(1.5),
  },
  card: {
    marginTop: "25px",
    marginBottom: "10px",
    minWidth: 275,
  },
  appHeader: {
    backgroundColor: "#222",
    height: "120px",
    padding: "20px",
    color: "#fff",
  },
  appLogo: {
    /* animation: appLogoSpin infinite 20s linear; */
    height: "50px",
  },
  app: {
    textAlign: "center",
  },
}));

const LoginPage = () => {
  const { handleChange: updateCreds, cred } = useCred()
  
 
  const signInwithGithub =  async (key: keyof AppCredentials) => {
    auth.signInWithPopup(provider).then(async (result) => {
      var Credential = result.credential as firebase.auth.OAuthCredential;
      var tokenfromfirebase: string = Credential.accessToken || "";
      await setSyncStorage("AccessToken", tokenfromfirebase);
      const Token = await getSyncStorage("AccessToken");
      updateCreds?.({ ...(cred || {}), [key]: String(tokenfromfirebase) })

    });
  };

 
  const classes = useStyles();

  return (
    <div>
      <div className={classes.app}>
        <div className={classes.appHeader}>
          <h1>Obsidian Grab</h1>
          <GitHubIcon style={{ fontSize: 60 }} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          placeItems: "center",
          marginBottom: "25px",
        }}
      >
        <Card elevation={5} className={classes.card}>
          <Button
            fullWidth
            disableElevation={false}
            className={classes.button}
            onClick={() => signInwithGithub("AccessTokennnn")}
            color="primary"
          >
            <img
              className={classes.image}
              src="https://img.icons8.com/material-sharp/48/000000/github.png"
            />
            <span>Login with Github &nbsp;&nbsp;&nbsp;</span>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
