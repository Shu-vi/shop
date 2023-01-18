import React, {useContext, useEffect, useMemo} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {deleteBasket} from "../http/BasketApi";
import DeviceItem from "../components/DeviceItem";
import {fetchBrands, fetchAllDevices, fetchTypes} from "../http/DeviceApi";
import style from '../styles/pages/basket.module.css';

const Basket = observer(() => {
    const {basket, device} = useContext(Context);

    useEffect(() => {
        fetchTypes()
            .then(data => device.setTypes(data))
        fetchBrands()
            .then(data => device.setBrands(data))
        fetchAllDevices().then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })

    }, []);

    const getDeviceById = (id) => {
        const devices = device.devices;
        const foundDevice = devices.filter(d => d.id === id);
        return foundDevice[0];
    };

    const totalPrice = () => {
        let total = 0;
        basket.basketContent.forEach((i) => {
            const d = getDeviceById(i.deviceId);
            total += d.price;
        })
        return total;
    };

    const deleteDevice = (id) => {
        return () => {
            deleteBasket(id)
                .then(() => {
                    basket.setBasketContent(basket.basketContent.filter(e => e.id !== id));
                });
        }
    };

    return (
        <div className={style.wrapper}>
            <span className={`${style.text}`}>Корзина:</span>
            {basket.basketContent.map((i) => {
                const d = getDeviceById(i.deviceId);
                return <DeviceItem onDelete={deleteDevice(i.id)} replace={true} key={i.id} device={d}
                                   brandList={device.brands}/>;
            })}
            {
                basket.basketContent.length > 0 ?
                    <span className={`${style.text}`}>Итого: {totalPrice().toLocaleString('ru-RU')} руб.</span>
                    :
                    <span className={`${style.text}`}>Корзина пуста</span>
            }
        </div>
    );
});

export default Basket;