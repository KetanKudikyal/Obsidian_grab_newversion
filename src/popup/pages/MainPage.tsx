import * as React from "react";
import { useState, useEffect, useRef } from "react";
import WorkflowPage from "../components/Workflow";
import { auth } from "../../background_script/firebase";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NoWorkFlow from "./NoWorkFlow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { fetchBranches } from "../utils/getBranches";
import { AppCredentials, useCred } from "../utils/useToken";
import { getWorkflows } from "../utils/getWorkflows";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { getrepos } from "../utils/getrepos";

const useStyles = makeStyles({
  root: {
    border: 0,
    height: 48,
    // padding: '0 30px',
  },
  button: {
    display: "block",
    top: "70px",
    marginLeft: " auto",
    marginRight: "auto",
    width: "20%",
    padding: "10px",
    background: "black",
    border: "25px",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  logout: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    marginBottom: "25px",
  },
  font: {
    fontFamily: "Roboto",
  },
  page: {
    border: 0,
    height: 48,
    padding: "0 30px",
  },
});

const MainPage = () => {
  const classes = useStyles();
  const [Workflow, setWorkflow] = useState<boolean>(false);
  const [repoNames, setrepoNames] = useState<[]>([]);
  const [WorkflowStatus, setWorkflowStatus] = useState<boolean>(true);
  const [WorkflowList, setWorkflowList] = useState<[]>([]);
  const [branch, setBranch] = useState<[]>([]);
  const {
    handleChange: updateCreds,
    handleRemove,
    handleback,
    cred,
  } = useCred();

  const valueRef = useRef("");

  const sendValue = async (key: keyof AppCredentials) => {
    const name = valueRef.current.value;
    updateCreds?.({ ...(cred || {}), [key]: String(name) });
    const token = cred?.token;
    // GettingWorkflows
    const data = await getWorkflows(name, String(token));
    const workflow = data.workflows.map((workflow: any) => {
      const name = workflow.name;
      const id = workflow.id;
      return { name, id };
    });
    setWorkflowList(workflow);
    if (data.workflows.length == 0) {
      setWorkflowStatus(false);
      setWorkflow(true);
    } else {
      setWorkflow(true);
    }
    const BranchData = await fetchBranches(name, String(token));
    setBranch(BranchData);
  };

  const handleRemoveonLogout = async () => {
    // databaseRef.remove()
    // .then(function() {
    //   console.log("Remove succeeded.")
    // })
    // .catch(function(error) {
    //   console.log("Remove failed: " + error.message)
    // });
    handleRemove();
    auth.signOut();
  };

  const fetchRepos = async () => {
    const repoData = await getrepos(String(cred?.token));
    // const data = await repoData.json();
    const Repos = repoData.map((reponame: any) => {
      return reponame.full_name;
    });
    setrepoNames(Repos);
  };

  useEffect(() => {
    handleback();
    fetchRepos();
  }, []);

  return (
    <div className={classes.root}>
      {Workflow ? (
        WorkflowStatus ? (
          <WorkflowPage workflows={WorkflowList} branch={branch} />
        ) : (
          <NoWorkFlow />
        )
      ) : (
        <div className={classes.page}>
          <PowerSettingsNewIcon
            className={classes.logout}
            onClick={handleRemoveonLogout}
          />
          <h4 className={classes.font}>Select the repo</h4>
          <Autocomplete
            id="combo-box-demo"
            options={repoNames}
            getOptionLabel={(option: string) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={valueRef}
                label="Repos"
                variant="outlined"
              />
            )}
            fullWidth
          />
          <Button
            variant="contained"
            className={classes.button}
            color="secondary"
            onClick={() => sendValue("repoName")}
          >
            Send{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
