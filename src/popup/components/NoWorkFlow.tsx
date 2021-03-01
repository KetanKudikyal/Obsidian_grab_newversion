import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
const useStyles = makeStyles({
  root: {
    border: 0,
    height: 48,
    // padding: "0 30px",
  },
  text: {
    marginTop: "25px",
    textAlign: "center",
  },
});

const NoWorkFlow = () => {
  const classes = useStyles();

  const workflow = (
    <a href="https://github.com/Utkarshbhimte/obsidian-grab/blob/main/.github/workflows/main.yml">
      Workflow
    </a>
  );
  return (
    <div>
      <Header />
      <div className={classes.root}>
        <h3 className={classes.text}>
          Seems like you have not added the {workflow} script to your repo yet.
        </h3>
      </div>
    </div>
  );
};

export default NoWorkFlow;
