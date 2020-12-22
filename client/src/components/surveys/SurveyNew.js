//SurveyNew combines SurveyForm and SurveyFormReview components
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
    // Global state via Redux store and component level state can exist together in a React app
    // How to decide between Component state and Redux? Ask this question, is there ever going to be any other feature in the application which will need this information 
    constructor(props) {
        super(props);
        this.state = { showFormReview: false };
    }

    // state = { showFormReview: false }; // equivalent to above
    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview
                    onSurveySend={event => console.log(event)}
                    onCancel={() => this.setState({ showFormReview: false })}
                    />;
        }

        return <SurveyForm
                onSurveySubmit={() => this.setState({ showFormReview: true })}
                />;

    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    // Links with surveyForm created in SurveyFrom component. Whenever SurveyNew form is removed from the screen, the values inside Redux store state object's surveyForm objects are dumped automatically.
    // Wrap SurveyNew with reduxForm created with form as 'surveyForm', which will have destroyOnUnmount set to true as default. 
    form: "surveyForm" 
})(SurveyNew);