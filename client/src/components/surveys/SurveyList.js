import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SurveyList extends Component{
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">Sent on: { new Date(survey.dateSent).toLocaleDateString()}</p>
                        <p>Last User Response on: { new Date(survey.dateLastResponded).toLocaleDateString()}</p>
                    </div>
                    <div className="card-action">
                    <a>Yes: {survey.yes}</a>
                    <a>No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { surveys: state.surveys };
}

export default connect(mapStateToProps, actions)(SurveyList);