import React, { useContext, useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import style from "../styles/components/typeBar.module.css";
import {fetchTypes} from "../http/DeviceApi";

const TypeBar = observer(({ children, ...props }) => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes()
            .then(data => device.setTypes(data))
    }, []);

    const handleTypeClick = (type) => {
        if (type.id === device.selectedType.id) {
            device.setSelectedType({});
        } else {
            device.setSelectedType(type);
        }
    }

    return (
        <div className={`${style.wrapper}`}>
            {
                device.types.map((type) => {
                    const isSelected = type.id === device.selectedType.id;
                    return (
                        <div key={type.name} className={`${isSelected && style.activeType} ${style.type}`}
                             onClick={() => handleTypeClick(type)}>
                            {type.name}
                        </div>)
                })
            }
        </div>
    );
});

export default TypeBar;