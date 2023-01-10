import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    
    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        window.location.reload();
    }
    
    return (
        <div style={{width: '100%', backgroundColor: '#252525', color: 'white', padding: '15px 20px',
            justifyContent: 'space-between', display: 'flex', alignItems: 'center'
        }}>
            <div onClick={() => navigate(SHOP_ROUTE)} style={{textTransform: 'uppercase', fontSize: '20px', cursor: 'pointer'}}>
                Интернет магазин
            </div>
            <div>
                {
                    user.isAuth
                        ?
                        <>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(ADMIN_ROUTE, {replace: true})
                                }}
                                style={{backgroundColor: 'rgba(0, 0, 0, 0)', border: 'solid 1px #EEE',
                                fontSize: '20px', borderRadius: '5px', padding: '10px 5px',
                                color: '#EEE', cursor: 'pointer'}}>Админ панель</button>
                            <button onClick={logOut}
                                style={{
                                marginLeft: '10px', backgroundColor: 'rgba(0, 0, 0, 0)',
                                border: 'solid 1px #EEE', fontSize: '20px', borderRadius: '5px',
                                padding: '10px 5px', color: '#EEE', cursor: 'pointer'}}>
                                Выйти</button>
                        </>
                        :
                    <button
                        style={{marginLeft: '10px', backgroundColor: 'rgba(0, 0, 0, 0)',
                    border: 'solid 1px #EEE', fontSize: '20px', borderRadius: '5px',
                    padding: '10px 5px', color: '#EEE', cursor: 'pointer'}}
                    onClick={() => navigate(LOGIN_ROUTE)}>
                    Авторизация</button>
                }

            </div>
        </div>
    );
});

export default NavBar;