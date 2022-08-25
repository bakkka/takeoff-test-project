import React, {FC, useEffect, useState} from 'react';
import {AuthValues, LogValues} from "../../types/auth";
import axios from "axios";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {setAuthAction, UserLoginAction} from "../../store/reducers/LogInReducer";
import {useNavigate} from "react-router";
import './LoginPage.module.css'

const LoginPage:FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [state, setState] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false);
    const [signUpValue, setSignUpValue] = useState<AuthValues>({
        id:Date.now(),
        login:'',
        password:'',
        contacts:[],
    })
    const [logInValue, setLogInValue] = useState<LogValues>({
        login:'',
        password:'',
        id:0,
    })
    const [registrationCompleted, setRegistrationCompleted] = useState<boolean>(false)
    const change = () => {
        setState(!state)
        setRegistrationCompleted(false);
    }
    const setAuthLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpValue({...signUpValue, login:e.target.value})
    }
    const setAuthPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpValue({...signUpValue, password:e.target.value})
    }
    const setLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogInValue({...logInValue, login:e.target.value})
        setError(false);
    }
    const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogInValue({...logInValue, password:e.target.value})
        setError(false);
    }
    const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const response = await axios.get<LogValues[]>('http://localhost:3000/users')
        const users = response.data;
        users.map((user) => {
            if(user.login === logInValue.login && user.password === logInValue.password ){
                    console.log('ВЫ ВОШЛИ')
                    dispatch(setAuthAction(true))
                    navigate("/contacts")
                    dispatch(UserLoginAction(user.id))
            }
        })
        setError(true);
        setLogInValue({login:'', password:'', id:0})
    }
    const registration = async () => {
        await axios.post<AuthValues>('http://localhost:3000/users',signUpValue)
        setSignUpValue({id:Date.now(),login:'',password:'', contacts:[]})
        setRegistrationCompleted(true)
    }


    return (
        <div className={'main'}>
            <div style={{border:'1px solid teal', width:500, height:250}} >
                <div style={{display:'flex',  justifyContent:'center', marginTop:20}}>
                    <button style={{height:50, width:200, border: state ? '2px solid teal' : ''}}
                            onClick={() => change()} className={'btn'}>Войти</button>
                    <button style={{height:50, width:200, border: !state ? '2px solid teal' : ''}}
                            onClick={() => change()} className={'btn'}>Зарегистрироваться</button>
                </div>
                {state ? (
                    <div>
                        <h1 className={'title'}>Вход</h1>
                        <div style={{display:'flex',  justifyContent:'space-around'}}>
                            <input value={logInValue.login} onChange={(e) => setLogin(e)}
                                   className={'inpt'} style={{height:20, border: error ? '2px solid red' : ''}}
                                   placeholder={'Логин'}/>
                            <input value={logInValue.password} onChange={(e) => setPassword(e)} type={'password'}
                                   className={'inpt'} style={{height:20,  border: error ? '2px solid red' : ''}}
                                   placeholder={'Пароль'}/>
                        </div>
                        <div style={{display:'flex',  justifyContent:'center', marginTop:20, height:40}}>
                            <button onClick={(event) => login(event)} style={{width:165}}
                                    className={'btn'}>Войти</button>
                        </div>
                    </div>
                ) :  <div>
                    <h1 className={'title'}>Регистрация</h1>
                    <div style={{display:'flex',  justifyContent:'space-around'}}>
                        <input onChange={(e) => setAuthLogin(e)} className={'inpt'}
                               style={{height:20}} placeholder={'Логин'}/>
                        <input onChange={(e) => setAuthPassword(e)} className={'inpt'}
                               style={{height:20}} placeholder={'Пароль'}/>
                    </div>
                    <div style={{display:'flex',  justifyContent:'center', marginTop:20, height:40}}>
                        {!registrationCompleted ? (
                            <button onClick={() => registration()} className={'btn'}>Зарегистрироваться</button>
                        ) : <h2>Вы зарегистрированы</h2>}
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default LoginPage;
