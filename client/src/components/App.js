import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

// React Router use - based on different route of the app that user lands upon,
// show different sets of components on the screen
// BrowserRouter is the brain of React Router - expects at most 1 child
// Route is a component to set up a rule to map route to set of components

import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h3>Dashboard</h3>
const SurveyNew = () => <h3>Survey New</h3>

class App extends Component {
    // Material UI expects one root level div with class name "container"

    // Will be called initial time when the component is rendered
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/surveys/" component={Dashboard}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);

console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_STRIPE_KEY);