import * as React from "react";
import { Button, Card, Divider, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import { provider, auth } from "../../background_script/firebase";
import firebase from "firebase";

const signInwithGithub = () => {
  auth.signInWithPopup(provider).then((result) => {
    var Credential = result.credential as firebase.auth.OAuthCredential;
    var user = result.user;
    console.log(user);
    var token: string = Credential.accessToken || "";
    // chrome.storage.sync.set({key: token}, function() {
    //   console.log('token is set to ' + token);
    // });
    localStorage.setItem("accesstoken", token);
    // console.log(token);
  });
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeItems: "center",
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
    minWidth: 275,
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          placeItems: "center",
        }}
      >
        <GitHubIcon style={{ fontSize: 60 }} />
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
            <span>Login with Google &nbsp;&nbsp;&nbsp;</span>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
