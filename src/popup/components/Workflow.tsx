import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { AppCredentials, useCred } from "../utils/useToken";
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

const Workflow = (props: { workflows: any; branch: String[] }) => {
  const classes = useStyles();
  const WorkflowData = props.workflows;
  console.log("workflowsData", WorkflowData);

  const Branches = props.branch;
  const [workflowList, setworkflowList] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(true);
  const [Bname, setBname] = React.useState<string>("");
  const [ID, setID] = React.useState<string>("");
  const { handleChange: updateCreds, cred } = useCred();

  const handleChangeSelectWorkflow = async (
    event: React.ChangeEvent<{value: unknown }>,key: keyof AppCredentials) => {
    const wid = event.target.value as string ;
    setID(wid)
    updateCreds?.({ ...(cred || {}), [key]: String(event.target.value) });
    setDisable(false);
  };
  
  const handleChangeSelectBranch = async (
    event: React.ChangeEvent<{ value: unknown }>,
    key: keyof AppCredentials
  ) => {
    setBname(event.target.value as string);
    updateCreds?.({ ...(cred || {}), [key]: String(event.target.value) });
    if (ID && event.target.value) {
      setworkflowList(false);
    } else {
      setID("")
      setBname("");
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
                workflows
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={ID}
                onChange={(e) => handleChangeSelectWorkflow(e, 'workflowId')}
              >
                {WorkflowData.map((value:any) => (
                  <MenuItem value={value.id} key={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.field}>
            <h4>Choose your Branch</h4>
            <FormControl variant="filled" disabled={disable} className={classes.formControl}>
              <InputLabel id="simple-select-filled-label">
                branches
              </InputLabel>
              <Select
                labelId="simple-select-filled-label"
                id="simple-select-filled"
                value={Bname}
                onChange={(e) => handleChangeSelectBranch(e, 'branch')}
              >
                {Branches.map((value:any) => (
                  <MenuItem value={value.name} key={value.name}>
                    {value.name}
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
