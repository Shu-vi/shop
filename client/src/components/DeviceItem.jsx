import React from 'react';
import star from '../assets/star.png';
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import style from "../styles/components/deviceItem.module.css";

const DeviceItem = ({replace, replaceFunction, device, brandList, ...props}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)} className={`${style.wrapper}`}>
            <img alt="Изображение устройства" width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}
                 className={`${style.img}`}/>
            <div className={`${style.infoWrapper}`}>
                <div className={`${style.brandName}`}>{brandList.map((brand) => {
                    if (brand.id === device.brandId) {
                        return `${brand.name}`
                    }
                    return null
                })}</div>
                <div className={`${style.ratingWrapper}`}>
                    {device.rating}
                    <img alt="Изображение звезды" src={star} height={10} width={10}/>
                </div>
            </div>
            <div>{device.name}</div>
            <span className={`${style.block}`}>{device.price} руб.</span>
            {
                replace
                    ?
                    <button className={`${style.button}`} onClick={(event) => {
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