import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { AppCredentials, useCred } from "../utils/useToken";
import Alert from "@material-ui/lab/Alert";
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
  branch: Array<>;
}) => {
  const classes = useStyles();
  const WorkflowData = props.workflows;
  const Branches = props.branch;
  const [workflowList, setworkflowList] = useState<boolean>(true);
  const [ disable , setDisable] = useState<boolean>(true)
  const [state, setState] = React.useState<{ id: number; name: string }>({
    id: 0,
    name: "",
  });
  const [Bname, setBname] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(false);
  const { handleChange: updateCreds, cred } = useCred();
  const repoName = cred?.repoName;
  
  const handleChangeSelectWorkflow = async (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    key: keyof AppCredentials
  ) => {
    const name = event.target.name as keyof typeof state;
    console.log("WorkflowName", name);
    setState({
      ...state,
      [name]: event.target.value,
    });
    updateCreds?.({ ...(cred || {}), [key]: String(event.target.value) });
    setDisable(false)
  };

  const handleChangeBranch = async (
    event: React.ChangeEvent<{ value: unknown }>,
    key: keyof AppCredentials
  ) => {
    setBname(event.target.value as string);
    updateCreds?.({ ...(cred || {}), [key]: String(event.target.value) });
    if (state.id && event.target.value) {
      setworkflowList(false);
    } else {
      setAlert(true)
      setState({id: 0 , name :""})
      setBname('')
      setworkflowList(true);
    }
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
                onChange={(e) => handleChangeSelectWorkflow(e, "workflowId")}
                inputProps={{
                  name: "id",
                  id: "demo-simple-select-filled-label",
                }}
              >
                {WorkflowData.map((w: any) => (
                  <MenuItem value={w.id} key={w.id}>
                    {w.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {!alert ? (
            <div></div>
          ) : (
            <div className={classes.field}>
              <Alert severity="warning" onClose={() => setAlert(false)}>
                Please Select Workflow 
              </Alert>
            </div>
          )}
          <div className={classes.field}>
            <h4>Choose your Branch</h4>
            <FormControl disabled={disable} variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Branch
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={Bname}
                onChange={(e) => handleChangeBranch(e, "branch")}
              >
                {Branches.map((b: any) => (
                  <MenuItem key={b.id} value={b.name}>
                    {b.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      ) : (
        <AddNote />
      )}
    </div>
  );
};

export default Workflow;
