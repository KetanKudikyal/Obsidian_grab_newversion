import * as React from "react";
import { useState, useEffect, useRef } from "react";
// import { getting_workflows } from "../../background_script";
import WorkflowPage from "./Workflow";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../../background_script/firebase";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NoWorkFlow from "./NoWorkFlow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
    border:"25px"
  },
  logout: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
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
  // const [userdata, setuserdata] = useState<[]>([]);
  const [Workflow, setWorkflow] = useState<boolean>(false);
  const [repoNames, setrepoNames] = useState<[]>([]);
  const [WorkflowStatus, setWorkflowStatus] = useState<boolean>(true);
  const [WorkflowList, setWorkflowList] = useState<[]>([]);

  async function fetchdata() {
    const token = localStorage.getItem("accesstoken");
    console.log("ABye", token);
    const req = await fetch("https://api.github.com/user/repos?type=owner", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
      },
    });
    const data = await req.json();
    const Repos = data.map((reponame: any) => {
      return reponame.full_name;
    });
    setrepoNames(...repoNames, Repos);
  }

  React.useEffect(() => {
    fetchdata();
  }, []);

  const getting_workflows = async (name: string) => {
    const token = localStorage.getItem("accesstoken");
    console.log("getting_Workflow", name);

    const req = await fetch(
      `https://api.github.com/repos/${name}/actions/workflows?type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${token}`,
        },
      }
    );
    const data = await req.json();
    const workflow = data.workflows.map((workflow: any) => {
      const name = workflow.name;
      const id = workflow.id;
      return { name, id };
    });
    setWorkflowList(workflow);
    console.log(workflow);
    if (data.workflows.length == 0) {
      setWorkflowStatus(false);
      setWorkflow(true);
    } else {
      setWorkflow(true);
    }
  };

  console.log(WorkflowList);

  const valueRef = useRef(""); //creating a refernce for TextField Component

  const sendValue = () => {
    const name = valueRef.current.value;
    // localStorage.setItem('repoName' , name )
    getting_workflows(name);
    console.log(valueRef.current.value); //on clicking button accesing current value of TextField and outputing it to console
  };

  return (
    <div className={classes.root}>
      {Workflow ? (
        WorkflowStatus ? (
          <WorkflowPage workflows={WorkflowList} />
        ) : (
          <NoWorkFlow />
        )
      ) : (
        <div className={classes.page}>
          <ExitToAppIcon
            className={classes.logout}
            onClick={() => auth.signOut()}
          >
            logout
          </ExitToAppIcon>
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
            onClick={sendValue}
          >
            Send{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
