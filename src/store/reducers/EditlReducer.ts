import { SET_EDIT_FALSE, SET_EDIT_TRUE} from "../../types/contact";
import {IEdit, ModalAction} from '../../types/edit'

const defaultState: IEdit = {
    modal: false,
    id: 0,
 }
 export const EditlReducer = (state = defaultState, action:ModalAction) => {
    switch (action.type){
        case SET_EDIT_TRUE:
            return {...state, modal:true, id:action.payload}
        case SET_EDIT_FALSE:
            return {...state, modal: false, id: action.payload}
        default:
            return state;
    }
 }
export const SetModalTrueAction = (payload: number | undefined) => ({type: SET_EDIT_TRUE, payload});
export const SetModalFalseAction = (payload: number | undefined) => ({type: SET_EDIT_FALSE, payload});