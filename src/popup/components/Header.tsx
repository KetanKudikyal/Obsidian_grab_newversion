import * as React from 'react'
import GitHubIcon from "@material-ui/icons/GitHub";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
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


const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
        <div className={classes.appHeader}>
          <h1>Obsidian Grab</h1>
          <GitHubIcon style={{ fontSize: 60 }} />
          {/* <img src="https://img.icons8.com/material-sharp/48/000000/github.png" className={classes.appLogo} alt="logo" /> */}
        </div>
      </div>
  )
}

export default Header
