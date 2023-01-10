import React from 'react';
import star from '../assets/star.png';
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device, brandList, ...props}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)} style={{width: 170, cursor: 'pointer', border: 'solid 1px black', padding: 10, marginRight: '68px', marginBottom: '30px'}}>
            <img width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} style={{border: 'solid 1px black'}}/>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3}}>
                <div style={{color: 'rgba(0, 0, 0, .5)'}}>{brandList.map((brand) => {if (brand.id === device.brandId){return `${brand.name}`}})}</div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div>
                        {device.rating}
                    </div>
                    <img src={star} height={10} width={10}/>
                </div>
            </div>
            <div>{device.name}</div>
        </div>
    );
};

export default DeviceItem;