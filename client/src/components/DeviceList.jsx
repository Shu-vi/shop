import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = useContext(Context);
    return (
        <div style={{display: 'flex', marginTop: 10, flexWrap: 'wrap', width: '100%'}}>
            {device.devices.map((i) => {
                return <DeviceItem key={i.id} device={i} brandList={device.brands}/>;
            })}
        </div>
    );
});

export default DeviceList;