import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { pushContent } from "./PushContent"
import Header from "./Header"

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
    backgroundColor:"black"
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
}));

const Workflow = (props: { workflows: any }) => {
  const classes = useStyles();
  const valueRef = useRef("");
  const WorkflowData = props.workflows;
  console.log("WorkFlowPage", WorkflowData);
  const [age, setAge] = React.useState("");
  const [workflowList, setworkflowList] = useState<boolean>(true);
  const [formState, setFormState] = useState<"loading" | "idle" | "done">(
    "idle"
  );
  // const [state, setState] = React.useState<{ id:  number }>({id:0});
  const [textValue, setTextValue] = useState("");
  const [WorkflowId, setWorkflowId] = useState<number>(null);
  const [state, setState] = React.useState<{ id: number; name: string }>({
    id: 0,
    name: "",
  });

  const length: boolean = !textValue.length;
  console.log(length);
  console.log(formState);

  const handleChangeSelect = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    console.log(name);

    setState({
      ...state,
      [name]: event.target.value,
    });
    setworkflowList(false);
  };
  console.log(state);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      setFormState("loading");

      await pushContent({ data: textValue , id:state.id})
    } catch (error) {
      console.error(error);
    } finally {
      setFormState("done");
    }
  };
  const resetForm = () => {
    setTextValue("");
    setFormState("idle");
  };

  return (
    <div>
      {workflowList ? (
        <div className={classes.field}>
             <h4>Choose your workflow</h4>
          <FormControl variant="filled" className={classes.formControl}>
         
            <InputLabel id="demo-simple-select-filled-label">Workflows</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={state}
              onChange={handleChangeSelect}
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
      ) : (
        <div>
          {formState !== "done" && (
            <form onSubmit={handleSubmit}>
              <div className={classes.field}>
                <h4>Add a note</h4>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="Add a note"
                  value={textValue}
                  onChange={handleChange}
                />
                {formState === "idle" && (
                  <div>
                    <Button
                      className={classes.textbutton}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={length}
                      fullWidth
                    >
                      <span role="img">🚀</span>
                    </Button>
                  </div>
                )}
                {formState === "loading" && <span role="img">Loading...</span>}
              </div>
            </form>
          )}
          {formState === "done" && (
              <div>
                <Header />
              <h4 style={{ textAlign:"center"}} >The note has been added ✔</h4>
                <div style={{textAlign:"center"}}>
                <Button className={classes.textbuttonAdd}   color="primary" onClick={resetForm} variant="contained">
                <span role="img">👈</span> Add another
              </Button>
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Workflow;

// {" "}
// <Autocomplete
//   id="combo-box-demo"
//   options={props.workflows}
//   getOptionLabel={(option: any) => option.name}
//   renderInput={(params) => (
//     <TextField
//       {...params}
//       inputRef={valueRef}
//       label="Repos"
//       variant="outlined"
//     />
//   )}
//   fullWidth
// />
// <Button variant="contained" color="secondary" onClick={sendValue}>
//   Send{" "}
// </Button>
