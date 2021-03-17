import * as React from 'react'
import { useEffect, useState } from 'react';
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import BackspaceIcon from '@material-ui/icons/Backspace';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { pushContent } from "../utils/PushContent";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "./Header";
import { getSyncStorage, removeSyncStorage } from '../utils/sync-storage';
import { auth } from '../../background_script/firebase';
import MainPage from '../pages/MainPage';


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
  }
}));



const AddNote = ({ Bname, repoName, workflowId }) => {
 

  const classes = useStyles();
  const [formState, setFormState] = useState<"loading" | "idle" | "done">(
    "idle"
  );
  const [state, setState] = React.useState<{ id: number; name: string }>({
    id: 0,
    name: "",
  });
  const [main, setmain] = useState<boolean>(false);
  const [textValue, setTextValue] = useState("");
  const [UrlValue, setUrlValue] = useState("");
  const [url, setUrl] = useState<any | null>(null);
  const [length, setLength] = useState<boolean>(true);

  // if (!textValue.length) {
  //   setLength(false)
  // }

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
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      var url = tabs[0].url;
      setUrl(url);
    });
  }, []);


  const handleSubmit = async (e: React.FormEvent<Element>) => {
    e.preventDefault();
    try {
      setFormState("loading");
      await pushContent({ data: textValue || UrlValue, id: workflowId, repoName, Bname });
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

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setLength(false)
    }
    console.log(e.target.value);
    setTextValue(e.target.value);
   
  };

  const S = () => {
    // setTextValue(url);
    setUrlValue(url)
    setLength(false)
  };

  const removeCred = async () => {
    await removeSyncStorage("repoName")
    await removeSyncStorage("workflowId")
    await removeSyncStorage("Bname")
    setmain(true)
  }

  return (
    <div>

      {main ? <MainPage /> : (
        <div>
          < BackspaceIcon className={classes.backButton} onClick={removeCred} />
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
                      onClick={S}
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
  )
}


export default AddNote
