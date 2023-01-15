import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import style from "../styles/components/deviceList.module.css";

const DeviceList = observer(() => {
    const {device} = useContext(Context);
    return (
        <div className={`${style.list}`}>
            {device.devices.map((i, index) => {
                return <DeviceItem isLast={index % 4 === 0} key={i.id} device={i} brandList={device.brands}/>;
            })}
        </div>
    );
});

export default DeviceList;