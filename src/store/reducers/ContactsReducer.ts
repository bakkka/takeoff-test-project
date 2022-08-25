import {
    ADD_CONTACT,
    CHANGE_CONTACT,
    ContactAction,
    DELETE_CONTACT, FETCH_CONTACTS_SUCCESS,
    IContacts
} from "../../types/contact";
import {IContact} from "../../types/contact";
import axios from "axios";

export const defaultState: IContacts = {
    contacts: [
        // {id:5, name:'arrr', number:12222}
    ],
}

export const ContactsReducer = (state = defaultState, action: ContactAction):IContacts => {
    switch (action.type){
        case DELETE_CONTACT:
            return {...state, contacts: state.contacts.filter(contact => contact.id !== action.payload)}
        case ADD_CONTACT:
            return <IContacts>{...state, contacts: [...state.contacts, action.payload]}
        case CHANGE_CONTACT:
            state.contacts.map((contact) => {
                if(contact.id === action.payload.id){
                    contact.name = action.payload.name;
                    contact.number = action.payload.number;
                }
            })
            axios.patch(`http://localhost:3000/users/${action.payload.userId}`, {contacts: state.contacts})
            return state;
        case FETCH_CONTACTS_SUCCESS:
            return <IContacts>{...state, contacts: action.payload}
        default:
            return state;
    }
}
export const deleteContactAction = (payload: number | undefined) => ({type: DELETE_CONTACT, payload});
export const addContactAction = (payload: IContact) => ({type: ADD_CONTACT, payload});
export const changeContactAction = (payload:IContact) => ({type:CHANGE_CONTACT, payload})