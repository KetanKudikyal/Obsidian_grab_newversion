import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./utils/useToken";

require("./index.css");

ReactDOM.render(
  
      <AuthProvider>
      <App />
      </AuthProvider>,
  document.getElementById("root") as HTMLElement
);
