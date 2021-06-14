// React Imports
import React from 'react';
import ReactDOM from 'react-dom';
// 3rd Party Imports
// Material Ui Imports
import { ThemeProvider } from "@material-ui/core/styles";
// Local Imports
import './index.css';
import App from './App';
import { theme } from "./theme/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
