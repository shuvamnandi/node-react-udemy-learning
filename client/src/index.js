//CSS could have been imported in App.js also
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";
// Temporarily added to send POST requests from React app console, along with all the user info present in requests
import axios from "axios";
window.axios = axios;

const store = createStore( reducers, {}, applyMiddleware(reduxThunk) );
// arguments passed: reducers, initial state, applyMiddleware()

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root"));