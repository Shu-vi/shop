import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE, {replace: true});
        } catch (e) {
            alert(e.response.data.message);
        }
    }
    return (
        <div style={{
            height: window.innerHeight - 75,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{border: '1px solid #888', width: '600px', padding: '50px'}}>
                <h2 style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    textAlign: 'center'
                }}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <form style={{display: 'flex', flexDirection: 'column'}}>
                    <input placeholder={'Введите ваш email...'} style={{marginTop: '12px', padding: '8px'}}
                           value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <input type={'password'} placeholder={'Введите ваш пароль...'}
                           style={{marginTop: '12px', padding: '8px'}} value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={{
                                textDecoration: 'none',
                                color: 'rgb(89, 120, 240)'
                            }}>Зарегистрируйся!</NavLink>
                            </div> :
                            <div>
                                Уже есть аккаунт? <NavLink to={LOGIN_ROUTE} style={{
                                textDecoration: 'none',
                                color: 'rgb(89, 120, 240)'
                            }}>Войдите!</NavLink>
                            </div>
                        }
                        <button style={{
                            padding: '10px', marginTop: '12px', backgroundColor: 'rgba(0, 0, 0, 0)',
                            color: 'rgb(80, 150, 50)', fontSize: '15px', border: 'solid 2px rgb(80, 150, 50)',
                            borderRadius: '5px', cursor: 'pointer',
                        }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    click();
                                }}>{isLogin ? 'Войти' : 'Регистрация'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default Auth;