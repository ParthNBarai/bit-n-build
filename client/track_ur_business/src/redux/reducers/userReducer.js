import { ActionTypes } from "../constants/action-types";

const initialState = {
    user:[],
}

export const userReducer = (state=initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.SIGNUP_USER:
            return { ...state, user: payload };
        default:
            return state;    
    }
}