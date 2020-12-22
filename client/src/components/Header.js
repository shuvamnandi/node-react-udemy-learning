import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";

class Header extends Component{
    renderContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return (
                    // anchor tag takes to a different HTML page / domain
                    <li>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default: // logged in
                const components = [
                    <Payment/>,
                    <a>Credits: {this.props.auth.credits}</a>,
                    <a href="/api/logout">Logout</a>
                ];
                return components.map((component) => <li key={components.indexOf(component)} style={{margin: "0 5px"}}>{component}</li>);
        }
    }


    render() {
        console.log(this.props.auth);
        return (
            <nav>
                <div className="nav-wrapper orange darken-3" style={{paddingLeft: "10px"}}>
                    <Link to={this.props.auth ? "/surveys" : "/"} className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right">
                        <li>
                            <a>{this.renderContent()}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);