import React, {FC, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {IContact} from "../../types/contact";
import {addContactAction, changeContactAction} from "../../store/reducers/ContactsReducer";
import {SetModalFalseAction, SetModalTrueAction} from "../../store/reducers/EditlReducer";
import axios from "axios";



const Edit:FC<IContact> = ({id}) => {
    const userId = useTypedSelector(state => state.auth.id)
    const [newUser, setNewUser] = useState<IContact>({
        id:id,
        name:'',
        number: null,
        userId: userId
    })
    const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, name: e.target.value});
    }
    const setNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, number: Number(e.target.value)});
    }
    const dispatch = useDispatch();
    const saveChanges =  () => {
        dispatch(changeContactAction(newUser))
        setNewUser({id:Date.now(),name:'', number:null})
        setModal();
    }
    const setModal = () => {
            dispatch(SetModalFalseAction(0))
    }
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Редактирование</h1>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <input onChange={(e) => setName(e)}
                       className={'inpt'} placeholder={'Имя пользователя'} style={{height:30}}/>
                <input onChange={(e) => setNumber(e)}
                       className={'inpt'} placeholder={'Номер пользователя'} style={{height:30}}/>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <button onClick={() => saveChanges()} className={'btn'}style={{height:30, marginTop:20}}>Сохранить</button>
            </div>
        </div>
    );
};

export default Edit;
