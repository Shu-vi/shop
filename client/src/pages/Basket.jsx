import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {deleteBasket} from "../http/BasketApi";
import DeviceItem from "../components/DeviceItem";
import {fetchBrands, fetchAllDevices, fetchTypes} from "../http/DeviceApi";

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
    const getDeviceById = (id) => {
        const devices = device.devices;
        const foundDevice = devices.filter(d => d.id === id);
        return foundDevice[0];
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 90px'}}>
            <span style={{fontSize: 36, letterSpacing: 3}}>Корзина:</span>
            {basket.basketContent.map((i) => {
                const d = getDeviceById(i.deviceId);
                return <DeviceItem replaceFunction={deleteDevice(i.id)} replace={true} key={i.id} device={d}
                                   brandList={device.brands}/>;
            })}
            <span style={{fontSize: 36, letterSpacing: 3}}>Итого: {totalPrice()} руб.</span>
        </div>
    );
});

export default Basket;