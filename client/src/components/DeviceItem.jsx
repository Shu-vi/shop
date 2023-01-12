import React from 'react';
import star from '../assets/star.png';
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({replace, replaceFunction, device, brandList, ...props}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)} style={{
            width: 170,
            cursor: 'pointer',
            border: 'solid 1px black',
            padding: 10,
            marginRight: '68px',
            marginBottom: '30px',
        }}>
            <img alt="Изображение устройства" width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}
                 style={{border: 'solid 1px black'}}/>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3}}>
                <div style={{color: 'rgba(0, 0, 0, .5)'}}>{brandList.map((brand) => {
                    if (brand.id === device.brandId) {
                        return `${brand.name}`
                    }
                    return null
                })}</div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div>
                        {device.rating}
                    </div>
                    <img alt="Изображение звезды" src={star} height={10} width={10}/>
                </div>
            </div>
            <div>{device.name}</div>
            <span style={{display: 'block'}}>{device.price} руб.</span>
            {
                replace
                    ?
                    <button style={{
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        border: '1px solid black',
                        borderRadius: '5px',
                        padding: '10px 5px',
                        fontSize: 16,
                        cursor: 'pointer',
                        marginTop: 5,
                        left: 75,
                        position: "relative"
                    }} onClick={(event) => {
                        event.stopPropagation();
                        replaceFunction();
                    }}>Удалить</button>
                    :
                    null
            }
        </div>
    );
};

export default DeviceItem;