import React, {FC, useEffect, useState} from 'react';
import {IContact, IContacts} from "../../types/contact";
import ContactsItem from "../../components/ContactsItem/ContactsItem";
import {useDispatch, useSelector} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {addContactAction} from "../../store/reducers/ContactsReducer";
import {useAction} from "../../hooks/useAction";
import axios from "axios";
import {setAuthAction} from "../../store/reducers/LogInReducer";
import {useNavigate} from "react-router";
import './ContactsPage.css'

const ContactsPage:FC = () => {
    const navigate = useNavigate();
    const userId = useTypedSelector(state => state.auth.id)
    const contacts = useTypedSelector(state => state.contacts.contacts)
    const {fetchUsers} = useAction()
    const dispatch = useDispatch();

    useEffect(() => {
        fetchUsers(userId);
    }, [userId])

    useEffect(() => {
        setSorted(contacts)
    }, [contacts]);
    const [newUser, setNewUser] = useState<IContact>({
        id:Date.now(),
        name:'',
        number: null,
    })
    const [searchValue, setSearchValue] = useState<string>('');
    const [sorted, setSorted] = useState<IContact[]>(contacts)

    const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, name: e.target.value});
    }
    const setNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({...newUser, number: Number(e.target.value)});
    }
    const createContact = async () => {
        if(newUser.name &&  newUser.number) {
            dispatch(addContactAction(newUser))
            const newContacts = [...contacts, newUser]
            console.log(newContacts);
            await axios.patch(`http://localhost:3000/users/${userId}`,{contacts: newContacts})
        }
        setNewUser({id: Date.now(),name: '', number: null});
    }
    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        let sorts:IContact[] = []
        if(searchValue) {
            contacts.map((contact) => {
                if (contact.name?.toLowerCase().includes(searchValue.toLowerCase())) {
                    setSorted([]);
                    sorts.push(contact)
                    setSorted(sorts)
                }
            })
        }
        else{
            sorts = [];
            setSorted(contacts)
        }
    }, [searchValue]);

    const exit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(setAuthAction(false));
        navigate("/")
    }

    return (
        <div className={'main'}>
                    <div>
                        <div className={'head'}>
                            <button onClick={(event) => exit(event)}
                                    style={{marginLeft:7, height:30}} className={'btn'}>Выйти</button>
                            <h1 className={'title'}>Список контактов:</h1>
                        </div>
                        <div className={'buttons'}>
                            <div className={'new_User'}>
                                <input value={newUser.name} onChange={(e) => setName(e)}
                                       className={'inpt'} placeholder={'Имя пользователя'} style={{height:30}}/>
                                <input type={'number'} onChange={(e) => setNumber(e)}
                                        className={'inpt'} placeholder={'Номер пользователя'} style={{height:30}}/>
                            </div>
                            <button onClick={() => createContact()}
                                    className={'btn'} style={{width:120, marginLeft:5, height:80}}>
                                Добавить пользователя
                            </button>
                        </div>
                        <div>
                            <input value={searchValue} onChange={(e) => search(e)}
                                   className={'search'} placeholder={'Поиск'}/>
                        </div>
                        {contacts.length > 0 ? (
                        <div style={{marginTop:20}}>
                        {sorted.map((contact,index) => (
                            <ContactsItem index={index} key={contact.id} contact={contact}></ContactsItem>
                            ))
                        }
                        </div>
                        ) : <h1 style={{textAlign: 'center'}}>Нет контактов</h1>}
                    </div>
        </div>
    );
};

export default ContactsPage;
