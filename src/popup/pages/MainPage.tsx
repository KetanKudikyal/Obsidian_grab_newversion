import * as React from "react";
import { useState, useEffect, useRef } from "react";
import WorkflowPage from "../components/Workflow";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../../background_script/firebase";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NoWorkFlow from "./NoWorkFlow";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { fetchBranch } from "../utils/GettingBranches";
import { getSyncStorage, removeSyncStorage } from "../utils/sync-storage.js";
import usefetchrepo from "../utils/usefetchrepo";
import { useContext } from "react";
import { AppCredentials, useCred } from "../utils/useToken";
import { getWorkflows } from "../utils/getWorkflows";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { setSyncStorage } from "../utils/sync-storage";

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
  const [Workflow, setWorkflow] = useState<boolean>(false);
  const [repoName, setrepoName] = useState<string>("");
  const [WorkflowStatus, setWorkflowStatus] = useState<boolean>(true);
  const [WorkflowList, setWorkflowList] = useState<[]>([]);
  const [branch, setBranch] = useState<[]>([]);
  const { repoNames } = usefetchrepo();
  const { handleChange: updateCreds, cred } = useCred()

  console.log("Utkarsh" ,cred?.repoName );
  
  const getttingCredentials = async () => {
    const token = await getSyncStorage("AccessToken")
    const repoName = await getSyncStorage("repoName")
    const workflowId = await getSyncStorage("workflowId")
    console.log(token.AccessToken);
    console.log(repoName.repoName);
    console.log(workflowId.workflowId);
    
  }

  useEffect(() => {
    getttingCredentials()
  }, [])
   
  
  const sendValue = async (key: keyof AppCredentials) => {
    const name = valueRef.current.value;
    await setSyncStorage("repoName" , name)
    updateCreds?.({ ...(cred || {}), [key]: String(name) })
    const gotdata = await getSyncStorage('GITHUB_KEY')
    console.log("GotData" , gotdata);
    
    setrepoName(name);
    gettingbranches(name);
    const TOKO = await getSyncStorage("AccessToken");
    console.log("Token", TOKO);

    const token = TOKO.AccessToken;
    const reponse = await getWorkflows(name , token)
    console.log("gettingWorkflowsPssy" , reponse);
    
    getting_workflows(name);
    console.log(valueRef.current.value);

    //on clicking button accesing current value of TextField and outputing it to console
  };
  const creds = cred?.repoName
  console.log("Crde", creds);
  
  const getting_workflows = async (name: string) => {
    const TOKO = await getSyncStorage("AccessToken");
    console.log("Token", TOKO);

    const token = TOKO.AccessToken;
    
    
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

  // console.log(WorkflowList);
//   const handleChange = (key: keyof AppCredentials) => (token: string) => {
//     console.log("Send handleChange is being called");
    
//     try {
//         console.log("Tokenum" , { token })
//         updateCreds?.({ ...(cred || {}), [key]: String(repoName) })
//     } catch (error) {
//         console.error(error)
//     }
// }


  const valueRef = useRef(""); //creating a refernce for TextField Component

  async function gettingbranches(name: string) {
    try {
      const namerepo = name;
      const data = await fetchBranch({ namerepo });
      setBranch(data);
      console.log("gettingbranches", data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemove = async () => {
    await removeSyncStorage("AccessToken");
    auth.signOut();
  };

  return (
      <div className={classes.root}>
        {Workflow ? (
          WorkflowStatus ? (
            <WorkflowPage
              workflows={WorkflowList}
              branch={branch}
              repoName={repoName}
           
            />
          ) : (
            <NoWorkFlow />
          )
        ) : (
          <div className={classes.page}>
            {/* <button onClick={handleChange('repoName')}>Click Me</button> */}
            <PowerSettingsNewIcon className={classes.logout} onClick={handleRemove} />
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
