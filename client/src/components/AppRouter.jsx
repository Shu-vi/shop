import React, {useContext} from 'react';
import {Route, Navigate, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../Routes";
import {ANY_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>{
                    return (
                        <Route key={path} path={path} element={<Component/>}/>
                    );
            })}
            {publicRoutes.map(({path, Component}) =>{
                    return (
                      <Route key={path} path={path} element={<Component/>}/>
                    );
            })}
            <Route path={ANY_ROUTE} element={<Navigate replace to={SHOP_ROUTE}/>}/>

        </Routes>
    );
};

export default AppRouter;