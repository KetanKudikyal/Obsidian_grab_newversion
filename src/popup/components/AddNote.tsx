import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { pushContent } from "../utils/PushContent";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "./Header";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MainPage from "../pages/MainPage";
import { AppCredentials, useCred } from "../utils/useToken";

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
  backButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
}));



const AddNote = () => {
  
  const {  cred  , handleback:resetCred, handleChange:updateCreds} = useCred();
  
  const classes = useStyles();
  const [formState, setFormState] = useState<"loading" | "idle" | "done">(
    "idle"
  );
  const [state, setState] = React.useState({
    checkedB: true,
  });
  const [main, setmain] = useState<boolean>(false);
  const [textValue, setTextValue] = useState("");
  const [UrlValue, setUrlValue] = useState("");
  const [url, setUrl] = useState<any | null>(null);
  const [length, setLength] = useState<boolean>(true);

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        var url = tabs[0].url;
        setUrl(url);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      setFormState("loading");
      await pushContent({
        data: `${textValue} " " ${UrlValue}`,
        ...(cred as AppCredentials)
      });
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

  const handleChange = (event:any) => {
    if (event.target.value.length > 0) {
      setLength(false);
    }
    console.log(event.target.value);
    setTextValue(event.target.value);
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    //  if
    if (event.target.checked === true) {
      setUrlValue(url);
      setLength(!event.target.checked);
    }
    // if Url is checked
    if (event.target.checked === false) {
      setUrlValue("");
      if (textValue.length > 0) {
        setLength(event.target.checked);
      } else {
        setLength(!event.target.checked);
      }
    }
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const removeCred = async () => {
    resetCred?.()
    setmain(true);
  };
  

  return (
    <div>
      {main ? (
        <MainPage />
      ) : (
        <div>
          <BackspaceIcon className={classes.backButton} onClick={removeCred} />
          {formState !== "done" && (
            <form onSubmit={handleSubmit}>
              <div className={classes.field}>
                  <h4>Add a note to {cred?.repoName}</h4>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="Add a note"
                  value={textValue}
                  onChange={handleChange}
                />
                {formState === "idle" && (
                  <div>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleCheckbox}
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="Add Url"
                      />
                    </FormGroup>
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

export default AddNote;


