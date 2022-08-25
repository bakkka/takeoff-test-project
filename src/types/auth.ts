import {AUTH, IContact, USER_LOGIN} from "./contact";


export interface Auth{
    auth:boolean
    id:number
}
export interface AuthCheck{
    type: typeof AUTH,
    payload:boolean,
}
export interface UserId{
    type: typeof USER_LOGIN,
    payload:number
}
export interface UserInfo{
    id:number,
    name:string,
    password:string,
    contacts:IContact[]
}

export type AuthAction = UserId | AuthCheck

export interface AuthValues{
    id:number;
    login:string;
    password:string
    contacts:IContact[]
}
export interface LogValues{
    login:string;
    password:string
    id:number;
    contacts?:IContact[]
}