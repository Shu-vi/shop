import React, {useContext, useEffect} from 'react';
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/DeviceApi";
import Pages from "../components/Pages";
import styles from '../styles/pages/shop.module.css';
import {PAGE_LIMIT} from "../utils/consts";

const Shop = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        fetchTypes()
            .then(data => device.setTypes(data))
        fetchBrands()
            .then(data => device.setBrands(data))
        fetchDevices(null, null, 1, PAGE_LIMIT).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })

    }, []);


    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, PAGE_LIMIT).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand])

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.content}`}>
                <div className={`${styles.wrapperTypeBar}`}>
                    <TypeBar/>
                </div>
                <div className={`${styles.wrapperContent}`}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </div>
            </div>
        </div>
    );
});

export default Shop;