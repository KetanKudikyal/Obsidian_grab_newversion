import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import {pushContent} from "./pushContent"

const useStyles = makeStyles({
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
});

const Workflow = (props: { workflows: any }) => {
  const valueRef = useRef("");
  const WorkflowData = props.workflows;
  console.log("WorkFlowPage", WorkflowData);
  const [workflowList, setworkflowList] = useState<boolean>(true);
  const classes = useStyles();
  const [formState, setFormState] = useState<"loading" | "idle" | "done">(
    "idle"
  );
  const [textValue, setTextValue] = useState("");
  const [WorkflowId, setWorkflowId] = useState<number>(null);

  const sendValue = () => {
    const name = valueRef.current.value;
    const result = WorkflowData.find(({ name: any }) => name === name);
    const id = result.id;
    setWorkflowId(id);

    // const id = props.workflows.find(name)
    // console.log(id);s

    setworkflowList(false);
    console.log(valueRef.current.value); //on clicking button accesing current value of TextField and outputing it to console
  };

  const length: boolean = !textValue.length;
  console.log(length);
  console.log(formState);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      setFormState("loading");

      // await pushContent({ data: textValue })
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
        <div>
          {" "}
          <Autocomplete
            id="combo-box-demo"
            options={props.workflows}
            getOptionLabel={(option: any) => option.name}
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
          <Button variant="contained" color="secondary" onClick={sendValue}>
            Send{" "}
          </Button>
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
              <h4>The note has been added ✔</h4>
              <Button onClick={resetForm} variant="contained">
                <span role="img">👈</span> Add another
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Workflow;
