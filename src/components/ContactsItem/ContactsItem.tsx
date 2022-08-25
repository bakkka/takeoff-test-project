import React, {FC} from 'react';
import {IContact} from "../../types/contact";
import {useDispatch} from "react-redux";
import {deleteContactAction} from "../../store/reducers/ContactsReducer";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {SetModalFalseAction, SetModalTrueAction} from "../../store/reducers/EditlReducer";
import Edit from "../Edit/Edit";
import axios from "axios";


interface ContactItemProps{
    contact: IContact;
    index: number,
}

const ContactsItem:FC<ContactItemProps> = ({contact,index}) => {
    const dispatch = useDispatch();
    const {modal, id} = useTypedSelector(state => state.modal)
    const userId = useTypedSelector(state => state.auth.id)
    const contacts = useTypedSelector(state => state.contacts.contacts)

    const deleteContact = async (contact:IContact) => {
        dispatch(deleteContactAction(contact.id))
        const newContacts = contacts.filter((res) => contact.id !== res.id)
        await axios.patch(`http://localhost:3000/users/${userId}`, {contacts:newContacts})
    }
    const setModal = (userId: number | undefined) => {
        if(!modal) {
            dispatch(SetModalTrueAction(userId))
        }
        else{
            dispatch(SetModalFalseAction(userId))
        }
    }
    return (
             <div style={{padding: 15, margin: 5,  border: '2px solid lightblue',
                 display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <div key={contact.id}
                     style={{
                         display:'flex',  justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                        {index+1}. {contact.name}
                    </div>
                    <div>
                       Number: {contact.number}
                    </div>
                    <button onClick={() => setModal(contact.id)} className={'btn'}>Редактировать</button>
                    <button onClick={() => deleteContact(contact)} className={'btn'}>Удалить</button>
                </div>
                <div>
                    {modal && contact.id === id  ? (
                        <div className={'modal'}>
                            <div className={'modal_content'}>
                                <Edit id={contact.id}></Edit>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
    );
};

export default ContactsItem;
