import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import style from "../styles/components/brandBar.module.css";
import {fetchBrands} from "../http/DeviceApi";

const BrandBar = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        fetchBrands()
            .then(data => device.setBrands(data));
    }, []);

    const handleBrandClick = (brand) => {
        if (brand.id === device.selectedBrand.id) {
            device.setSelectedBrand({});
        } else {
            device.setSelectedBrand(brand);
        }
    }

    return (
        <div className={`${style.wrapper} ${style.mobileWrapper}`}>
            {
                device.brands.map((brand) => {
                    const isSelected = brand.id === device.selectedBrand.id;
                    return <div key={brand.id}
                                className={`${isSelected && style.selectedBrand} ${style.brand}`}
                                onClick={() => handleBrandClick(brand)}>
                        {brand.name}
                    </div>
                })
            }
        </div>
    );
});

export default BrandBar;