import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as reduxFormReducer } from "redux-form";

export default combineReducers({
    auth: authReducer,                      // available as this.state.auth in other components
    form: reduxFormReducer                  // available as this.state.form in other components
});
