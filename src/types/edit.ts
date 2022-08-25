import {SET_EDIT_FALSE, SET_EDIT_TRUE} from "./contact";

export interface IEdit {
    modal:boolean;
    id:number;
}
export interface EditActionTrue {
    type: typeof SET_EDIT_TRUE;
    payload:number
}
export interface EditActionFalse {
    type: typeof SET_EDIT_FALSE;
    payload:number
}
export type ModalAction = EditActionTrue | EditActionFalse