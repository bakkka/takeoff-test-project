import {AUTH,  USER_LOGIN} from "../../types/contact";
import {Auth, AuthAction} from '../../types/auth'

const defaultState: Auth = {
    auth:false,
    id:0,
}
export const LogInReducer = (state = defaultState, action:AuthAction) => {
    switch (action.type){
        case AUTH:
            return {...state, auth: !state.auth};
        case USER_LOGIN:
            return {...state, id:action.payload}
        default:
            return state
    }
}
export const setAuthAction = (payload: boolean) => ({type: AUTH, payload});
export const UserLoginAction = (payload:number) => ({type:USER_LOGIN, payload})