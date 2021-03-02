import * as React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

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
const Workflow = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState<"loading" | "idle" | "done">(
    "idle"
  );
  const [textValue, setTextValue] = useState("");
  const [Disable, setDisable] = useState<boolean>(true);

  const length: boolean = !textValue.length;
  console.log(length);
  console.log(formState);

  const handleChange = (e) => {
    console.log(e.target.value);
    setTextValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    setFormState("loading");
    console.log("handleSubmit:", textValue);
  };
  const resetForm = () => {
    setTextValue("");
    setFormState("idle");
  };

  return (
    <div>
      {formState !== "done" && (
        <form onSubmit={handleSubmit}>
          <div className={classes.field}>
            <TextareaAutosize
              aria-label="minimum height"
              rowsMin={3}
              placeholder="Minimum 3 rows"
              value={textValue}
              onChange={handleChange}
            />
            {formState === "idle" && (
              <div>
                <button onClick={() => setFormState("done")}>Done</button>
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
  );
};

export default Workflow;
