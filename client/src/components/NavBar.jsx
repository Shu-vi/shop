import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {fetchBasket} from "../http/BasketApi";
import style from "../styles/components/navBar.module.css";

const NavBar = observer(() => {
    const {user, basket} = useContext(Context);
    const [isClickedBurger, setIsClickedBurger] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isAuth) {
            fetchBasket(user.user.id)
                .then((data) => basket.setBasketContent(data));
        }
    }, [user.isAuth, user.user.id, basket]);

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        navigate(SHOP_ROUTE);
    }

    return (
        <div className={`${style.wrapper}`}>
            <div onClick={() => navigate(SHOP_ROUTE)}
                 className={`${style.logo}`}>
                Интернет магазин
            </div>
            {
                user.isAuth
                    ?
                    <>
                        <div className={`${isClickedBurger && style.mobileWrapper}`}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(ADMIN_ROUTE, {replace: true})
                                }}
                                className={`${style.button} ${isClickedBurger && style.mobileButton}`}>Админ панель
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(BASKET_ROUTE, {replace: true});
                                }}
                                className={`${style.button} ${isClickedBurger && style.mobileButton}`}>Корзина {basket.basketContent.length}
                            </button>
                            <button onClick={logOut}
                                    className={`${style.button} ${isClickedBurger && style.mobileButton}`}>
                                Выйти
                            </button>
                        </div>
                        <div className={`${style.burger}`} onClick={() => setIsClickedBurger(!isClickedBurger)}/>
                    </>
                    :
                    <button
                        className={`${style.button} ${isClickedBurger && style.mobileButton}`}
                        onClick={() => navigate(LOGIN_ROUTE)}>
                        Авторизация</button>
            }
        </div>
    );
});

export default NavBar;