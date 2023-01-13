import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {fetchBasket} from "../http/BasketApi";
import style from "../styles/components/navBar.module.css";

const NavBar = observer(() => {
    const {user, basket} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBasket(user.user.id)
            .then(data => basket.setBasketContent(data));
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
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
                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(ADMIN_ROUTE, {replace: true})
                            }}
                            className={`${style.button}`}>Админ панель
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(BASKET_ROUTE, {replace: true})
                            }}
                            className={`${style.button}`}>Корзина {basket.basketContent.length}
                        </button>
                        <button onClick={logOut}
                                className={`${style.button}`}>
                            Выйти
                        </button>
                    </div>
                    :
                    <button
                        className={`${style.button}`}
                        onClick={() => navigate(LOGIN_ROUTE)}>
                        Авторизация</button>
            }
        </div>
    );
});

export default NavBar;