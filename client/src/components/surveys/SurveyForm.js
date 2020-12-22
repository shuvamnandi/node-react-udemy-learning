//SurveyForm shows a form for a user to add input
import React, { Component } from "react";
// reduxForm is a helper to allow tell Redux form that it needs to be in control of any form present inside this component
// identical to the 'connect' helper from Redux library
// Field is a helper for rendering any type of HTML form element (text input, file input, checkboxes, radio buttons, dropdowns)
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
    renderFields() {
        return formFields.map(({label, name})=>
            <Field key={name} component={SurveyField} type="text" label={label} name={name}  />
        );
    }

    render() {
        // name=surveyTitle corresponds to the key under which a value entered in the Field is available in the Redux store
        // component="input" can be replaced by a custom SurveyField component
        // handleSubmit is coming to SurveyForm via reduxForm
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="btn-flat left white-text red">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button className="btn-flat right white-text teal" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

const validate = values => {
    // values coming from our Survey dForm
    const errors = {};
    // ReduxForm will automatically connect the dots and pass the error to meta object inside each SurveyField (corresponding to a key present on the values object)

    errors.recipients = validateEmails(values.recipients || "");
    
    formFields.forEach(( { name } ) => {
        if (!values[name]) {
            errors[name] = "You must provide a value to this field";
        }
    });

    return errors;
};

export default reduxForm({
    validate: validate, // Provided by reduxForm
    form: 'surveyForm', // Links to the name on the state object pulled out of Redux store, from all the reducers combined: auth: {credits: 0, _id: "5fcbabd81eadb1340d669798", googleId: "107175085578596977191", givenName: "Shuvam", familyName: "Nandi", …} form: {surveyForm: {…}}
    destroyOnUnmount: false,
})(SurveyForm);