import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import { pushContent } from "../utils/PushContent";
import Header from "./Header";
import { AppCredentials, useCred } from "../utils/useToken";
import { getSyncStorage, setSyncStorage } from "../utils/sync-storage";
import AddNote from "./AddNote";

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    height: 48,
    padding: "0 30px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    margin: "10px",
  },
  textbutton: {
    marginTop: "40px",
    borderRadius: "25px",
  },
  textbuttonAdd: {
    marginTop: "10px",
    borderRadius: "25px",
    color: "white",
    backgroundColor: "black",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  font: {
    fontFamily: "Roboto",
  },
  page: {
    border: 0,
    height: 48,
    padding: "0 30px",
  },
  loader: {
    position: "absolute",
    top: "200px",
    left: "230px",
    color: "black",
  },
}));

const Workflow = (props: {
  workflows: any;
  
  repoName: string;
  branch: Array<>;
}) => {
  const classes = useStyles();
  const repoName = props.repoName;
  const WorkflowData = props.workflows;
  const Branches = props.branch;
 
  console.log("WorkFlowPage", WorkflowData);
  console.log("WorkFlowPage", Branches);
  const [workflowList, setworkflowList] = useState<boolean>(true);
  const [formState, setFormState] = useState<"loading" | "idle" | "done">(
    "idle"
  );
  const [textValue, setTextValue] = useState("");
  const [url, setUrl] = useState<any | null>(null);
  const [state, setState] = React.useState<{ id: number; name: string }>({
    id: 0,
    name: "",
  });
  const [Bname, setBname] = React.useState<string>("");
  const { handleChange: updateCreds, cred } = useCred()
  // console.log("Utkarsh" ,cred?.repoName );
  console.log("WorkflowCred" , cred)
  const lengthD = !textValue.length;

  

  useEffect(() => {
    const queryInfo = {active: true, lastFocusedWindow: true};
        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            var url = tabs[0].url;
            setUrl(url);
        });
  }, []);


  const handleChangeSelect = async (event: React.ChangeEvent<{ name?: string; value: unknown }>, key: keyof AppCredentials)  => {
    const name = event.target.name as keyof typeof state;
    await setSyncStorage("workflowId" , event.target.value)
    console.log("WorkflowName", name);
    setState({
      ...state,
      [name]: event.target.value,
    });
    updateCreds?.({ ...(cred || {}), [key]: String(event.target.value) })
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      setFormState("loading");
      await pushContent({ data: textValue, id: state.id, repoName, Bname });
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setFormState("done"), 1000);
    }
  };
  const resetForm = () => {
    setTextValue("");
    setFormState("idle");
  };

  const handleChangeB = async (event: React.ChangeEvent<{ value: unknown }> , key: keyof AppCredentials) => {
    setBname(event.target.value as string);
    await setSyncStorage('Bname' , event.target.value)
    updateCreds?.({ ...(cred || {}), [key]: String(event.target.value) })
    setworkflowList(false);
  };

  const UrlValue = () => {
    setTextValue(url);
  };
  return (
    <div>
      {workflowList ? (
        <div>
          <div className={classes.field}>
            <h4>Choose your workflow</h4>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Workflows
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={state}
                onChange={(e) => handleChangeSelect(e, 'workflowId')}
                inputProps={{
                  name: "id",
                  id: "demo-simple-select-filled-label",
                }}
              >
                {WorkflowData.map((w) => (
                  <MenuItem value={w.id} key={w.id}>
                    {w.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className={classes.field}>
            <h4>Choose your Branch</h4>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Branch
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={Bname}
                onChange={(e) => handleChangeB(e, 'branch')}
              >
                {Branches.map((b) => (
                  <MenuItem key={b.id} value={b.name}>{b.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      ) : (<AddNote  Bname={Bname} workflowId={state.id}   repoName={repoName} />)
      }
</div>
  )};

export default Workflow;
