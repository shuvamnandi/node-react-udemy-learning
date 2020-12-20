import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payment extends Component {

    render() {
        return (
            <StripeCheckout
                amount={1000}
                name="Emaily"
                description="Pay $10 for 10 email credits"
                token={token => this.props.handleToken(token)} // very poorly named property, as this expects a callback function
                stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payment);
