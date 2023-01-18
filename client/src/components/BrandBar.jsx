import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import style from "../styles/components/brandBar.module.css";

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <div className={`${style.wrapper} ${style.mobileWrapper}`}>
            {
                device.brands.map((brand) => {
                    const isSelected = brand.id === device.selectedBrand.id;
                    return <div key={brand.id}
                                className={`${isSelected ? style.selectedBrand : null} ${style.brand}`}
                                onClick={() => {
                                    if (isSelected) {
                                        device.setSelectedBrand({});
                                    } else {
                                        device.setSelectedBrand(brand);
                                    }
                                }}>{brand.name}</div>
                })
            }
        </div>
    );
});

export default BrandBar;