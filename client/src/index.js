import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { DetailsContextProvider } from "./Components/Context/detailsContext";

ReactDOM.render(
  <DetailsContextProvider>
    <React.Fragment>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </React.Fragment>
  </DetailsContextProvider>,
  document.getElementById("root")
);
