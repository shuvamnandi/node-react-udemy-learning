import axios from "axios";
import { FETCH_USER } from "./types";

// Redux Thunk gives a handle to a dispatch Function to send the action to all differrent
// reducers in the store, causing them to instantly recalculate the app state

// This is an action creator
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get("/api/current_user");
    dispatch({type: FETCH_USER, payload: res.data});
}

export const handleToken = token => async (dispatch) => {
    const res = await axios.post("/api/stripe", token);
    // res contains the User model as part of the request 
    // available as this.props.auth in any component using this
    dispatch({type: FETCH_USER, payload: res.data});
}

export const submitSurvey = (values, history) => async (dispatch) => {
    const res = await axios.post("/api/surveys", values );
    history.push("/surveys"); // redirect using withRouter helper from react-router-dom
    dispatch({type: FETCH_USER, payload: res.data});
}