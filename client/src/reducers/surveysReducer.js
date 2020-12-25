import { FETCH_SURVEYS } from "../actions/types";

// default state is returning an empty array once the web page is loaded
export default function reducer(state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default: 
            return state;
    }
}
