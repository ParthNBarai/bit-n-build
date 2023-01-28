import { ActionTypes } from "../constants/action-types"

export const signUpUser = (user) => {
    return{
        type:ActionTypes.SIGNUP_USER,
        payload: user,
    }
}