import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {
                device.brands.map((brand) => {
                    const notSelectedBrandStyles = {border: 'solid 1px #000', padding: '15px', cursor: 'pointer'};
                    const selectedBrandStyles = {
                        border: 'solid 1px #000',
                        padding: '15px',
                        backgroundColor: '#000',
                        color: '#FFF',
                        cursor: 'pointer'
                    };
                    const isSelected = brand.id === device.selectedBrand.id;
                    return <div key={brand.id} style={isSelected ? selectedBrandStyles : notSelectedBrandStyles}
                                onClick={() => device.setSelectedBrand(brand)}>{brand.name}</div>
                })
            }
        </div>
    );
});

export default BrandBar;