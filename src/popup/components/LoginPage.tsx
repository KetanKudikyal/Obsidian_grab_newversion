import * as React from "react";
import { Button, Card, Divider, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { provider, auth } from "../../background_script/firebase";
import firebase from "firebase";
import { setSyncStorage } from "./sync-storage.js";

const signInwithGithub = async () => {
  auth.signInWithPopup(provider).then(async (result) => {
    var Credential = result.credential as firebase.auth.OAuthCredential;
    var user = result.user;
    // console.log(user);
    var token: string = Credential.accessToken || "";
    await setSyncStorage("AccessToken", token);
  });
};

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
  const classes = useStyles();

  return (
    <div>
      <div className={classes.app}>
        <div className={classes.appHeader}>
          <h1>Obsidian Grab</h1>
          <GitHubIcon style={{ fontSize: 60 }} />
          {/* <img src="https://img.icons8.com/material-sharp/48/000000/github.png" className={classes.appLogo} alt="logo" /> */}
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
        {/* <GitHubIcon style={{ fontSize: 60 }} /> */}
        <Card elevation={5} className={classes.card}>
          <Button
            fullWidth
            disableElevation={false}
            className={classes.button}
            onClick={signInwithGithub}
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
