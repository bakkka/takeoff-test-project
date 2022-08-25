export const DELETE_CONTACT = 'DELETE_CONTACT';
export const ADD_CONTACT = 'ADD_CONTACT';
export const CHANGE_CONTACT= 'CHANGE_CONTACT';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';

export const SET_EDIT_TRUE = 'SET_EDIT_TRUE';
export const SET_EDIT_FALSE = 'SET_EDIT_FALSE';

export const AUTH = 'AUTH'
export const USER_LOGIN = 'USER_LOGIN'



export interface FetchContactsSuccessAction{
    type: typeof FETCH_CONTACTS_SUCCESS,
    payload: IContact[],
}
export interface IContacts{
    contacts: IContact[];
}
export interface IContact{
    id?: number;
    name?: string;
    number?: number | null;
    userId?:number | null;
}
export interface DeleteContact{
    type: typeof DELETE_CONTACT,
    payload: number,
}
export interface AddContact{
    type: typeof ADD_CONTACT,
    payload: IContacts[],
}
export interface ChangeContact{
    type: typeof CHANGE_CONTACT,
    payload: IContact,
}

export type ContactAction = DeleteContact | AddContact | ChangeContact | FetchContactsSuccessAction