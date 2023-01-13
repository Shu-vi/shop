import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/UserApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import style from "../styles/pages/auth.module.css";

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
        <div className={`${style.wrapper}`}>
            <div className={`${style.card}`}>
                <h2 className={`${style.cardTitle}`}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <form className={`${style.form}`}>
                    <input placeholder={'Введите ваш email...'} className={`${style.input}`}
                           value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <input type={'password'} placeholder={'Введите ваш пароль...'}
                           className={`${style.input}`} value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <div className={`${style.buttonWrapper}`}>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}
                                                       className={`${style.link}`}>Зарегистрируйся!</NavLink>
                            </div> :
                            <div>
                                Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}
                                                           className={`${style.link}`}>Войдите!</NavLink>
                            </div>
                        }
                        <button className={`${style.button}`}
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