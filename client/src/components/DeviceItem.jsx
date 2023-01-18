import React, {useCallback} from 'react';
import star from '../assets/star.png';
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import style from "../styles/components/deviceItem.module.css";
import PropTypes from 'prop-types';

const DeviceItem = ({replace, device, brandList, onDelete}) => {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate(`${DEVICE_ROUTE}/${device.id}`);
    }, [device.id]);

    const handleDelete = useCallback((event) => {
        event.stopPropagation();
        onDelete(device.id);
    }, [device.id]);

    const brand = brandList.find((brand) => brand.id === device.brandId);
    const brandName = brand ? brand.name : '';

    const price = device.price ? device.price.toLocaleString('ru-RU') : null;

    return (
        <div onClick={handleClick} className={`${style.wrapper} `}>
            <img alt="Device image" src={`${process.env.REACT_APP_API_URL}${device.img}`} className={`${style.img}`}/>
            <div className={`${style.infoWrapper}`}>
                <div className={`${style.brandName}`}>{brandName}</div>
                <div className={`${style.ratingWrapper}`}>
                    {device.rating}
                    <img alt="Star image" src={star} height={10} width={10}/>
                </div>
            </div>
            <div className={`${style.deviceName}`}>{device.name}</div>
            <span className={`${style.block} ${style.price}`}>{price} руб.</span>
            {replace && <button className={`${style.button}`} onClick={handleDelete}>Удалить</button>}
        </div>
    );
};

DeviceItem.propTypes = {
    replace: PropTypes.bool,
    device: PropTypes.shape({
        id: PropTypes.number.isRequired,
        brandId: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number,
    }).isRequired,
    brandList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    onDelete: PropTypes.func
};

DeviceItem.defaultProps = {
    replace: false,
    onDelete: () => {
    }
};

export default DeviceItem;