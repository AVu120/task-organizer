// Root file of our application.
import React from "react";
// Required to compile JSX into HTML
import ReactDOM from "react-dom";
import { Dashboard } from "./components/Dashboard";
import { Main } from "./components/main";
import store from "./store";

ReactDOM.render(<Main />, document.getElementById("app"));
