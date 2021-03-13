import * as React from "react";
import { useState, useEffect, useRef } from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import { pushContent } from "./PushContent";
import Header from "./Header";
import Sizes from "./AutoCompleteMU";

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
  const valueRef = useRef("");
  const repoName = props.repoName;
  const WorkflowData = props.workflows;
  const Branches = props.branch;
  console.log("WorkFlowPage", WorkflowData);
  console.log("WorkFlowPage", Branches);
  const [age, setAge] = React.useState("");
  const [workflowList, setworkflowList] = useState<boolean>(true);
  const [formState, setFormState] = useState<"loading" | "idle" | "done">(
    "idle"
  );
  const [textValue, setTextValue] = useState("");
  const [url, setUrl] = useState<any | null>(null);
  // const [WorkflowId, setWorkflowId] = useState<number>(null);
  const [state, setState] = React.useState<{ id: number; name: string }>({
    id: 0,
    name: "",
  });
  const [Bname, setBname] = React.useState<string>("");

  const length: boolean = !textValue.length;
  console.log(length);
  console.log(formState);

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        console.log("URLS", url);
        setUrl(url);
      });
  }, []);

  console.log("Urls", url);

  const handleChangeSelect = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    console.log("WorkflowName", name);

    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  // const handleChangeSelectBranches = (
  //   event: React.ChangeEvent<{ name?: string; value: unknown }>
  // ) => {
  //   const name = event.target.name as keyof typeof state;
  //   console.log("BranchName" , name);

  //   setBname({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  //   setworkflowList(false);
  // };

  console.log("Bracnhindasdada", Bname);
  console.log(state);

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

  const handleChangeB = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBname(event.target.value as string);
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
                onChange={handleChangeB}
              >
                {Branches.map((b) => (
                  <MenuItem value={b.name}>{b.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
                    <Button
                      className={classes.textbutton}
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={UrlValue}
                    >
                      Add Current Url
                    </Button>
                  </div>
                )}
                {formState === "loading" && (
                  <span role="img">
                    <CircularProgress
                      className={classes.loader}
                      color="secondary"
                    />
                  </span>
                )}
              </div>
            </form>
          )}
          {formState === "done" && (
            <div>
              <Header />
              <h4 style={{ textAlign: "center" }}>The note has been added ✔</h4>
              <div style={{ textAlign: "center" }}>
                <Button
                  className={classes.textbuttonAdd}
                  color="primary"
                  onClick={resetForm}
                  variant="contained"
                >
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
