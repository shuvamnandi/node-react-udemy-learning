import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = props => {
    const reviewFields = formFields.map(({label, name}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{props.formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please review your entries</h5>
            {reviewFields}
            <button
                className="btn-flat red white-text"
                onClick={props.onCancel}>
                Back
            </button>
            <button
                className="btn-flat green darken-2 white-text right"
                onClick={()=>props.submitSurvey(props.formValues, props.history)}>
                Send Survey
                <i className="material-icons right">
                    email
                </i>
            </button>
        </div>
    );
}

const mapStateToProps = state => {
    return { formValues: state.form.surveyForm.values };
};

// withRouter passes in a history object to SurveyFormReview component, which we can pass on to the submitSurvey action creator
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));