import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import { useEffect } from "react";
import { useCred } from "../utils/useToken";


const useStyles = makeStyles({
  root: {
    border: 0,
    height: 48,
  },
  text: {
    marginTop: "25px",
    textAlign: "center",
  },
});

const NoWorkFlow = () => {
  const classes = useStyles();
  const { handleChange: updateCreds, handleRemove:updateDocs , handleback, cred } = useCred()

  const removeCred = async () => {
    handleback()
    // updateCreds?.({ ...(cred || {}), ["repoName"]: String("") });
    // updateCreds?.({ ...(cred || {}), ["workflowId"]: String("") });
  };

  useEffect(() => {
    removeCred()
  }, []);

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
