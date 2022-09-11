import React, { useEffect, useState } from "react";
import { PetSearchPage } from "./components";
import "./styles/App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    
    //fontFamily: ["Poppins", "sans-serif"].join(",")
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <PetSearchPage/>
      </div>
    </ThemeProvider>
  );
}

export default App;
