import {ContactAction, FETCH_CONTACTS_SUCCESS} from '../../types/contact'
import {UserInfo} from '../../types/auth'
import {Dispatch} from "redux";
import axios from "axios";


export const fetchUsers = (id:number) => {
    return async(dispatch:Dispatch<ContactAction>) => {
        try {
            const response = await axios.get<UserInfo>(`http://localhost:3000/users/${id}`)
            setTimeout(() => dispatch({type:FETCH_CONTACTS_SUCCESS, payload:response.data.contacts}), 50)
        } catch (e){
            console.log(e)
        }
    }
}