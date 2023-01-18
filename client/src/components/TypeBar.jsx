import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import style from "../styles/components/typeBar.module.css";

const TypeBar = observer(({children, ...props}) => {
    const {device} = useContext(Context);
    return (
        <div className={`${style.wrapper}`}>
            {
                device.types.map((type) => {
                    const isSelected = type.id === device.selectedType.id;
                    return (
                        <div key={type.name} className={`${isSelected ? style.activeType : null} ${style.type}`}
                             onClick={() => {
                                 if (isSelected) {
                                     device.setSelectedType({});
                                 } else {
                                     device.setSelectedType(type);
                                 }
                             }}>
                            {type.name}
                        </div>)
                })
            }
        </div>
    );
});

export default TypeBar;