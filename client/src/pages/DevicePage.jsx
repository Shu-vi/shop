import React, {useContext, useEffect, useState} from 'react';
import bigStar from '../assets/bigStar.png';
import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/DeviceApi";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {createBasket} from "../http/BasketApi";
import style from '../styles/pages/devicePage.module.css';

const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();
    const {user, basket} = useContext(Context);

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data));
    }, []);

    const addDeviceToBasket = () => {
        createBasket(user.user.id, id)
            .then(data => basket.setBasketContent([...basket.basketContent, data]));
    };

    return (
        <div className={`${style.flex}  ${style.wrapper}`}>
            <div className={`${style.flex} ${style.deviceContent}`}>
                <img height={300} width={300} alt="Изображение устройства"
                     src={process.env.REACT_APP_API_URL + device.img}/>
                <div className={`${style.flex} ${style.deviceRatingWrapper}`}>
                    <h2 className={`${style.deviceName}`}>{device.name}</h2>
                    <div className={`${style.deviceRating} ${style.flex}`} style={{background: `url(${bigStar}) no-repeat center center`}}>
                        {device.rating}
                    </div>
                </div>
                <div className={`${style.flex} ${style.basketWrapper}`}>
                    <h3 className={`${style.fw}`}>От: {device.price} руб.</h3>
                    <button className={`${style.basketButton}`}
                            onClick={addDeviceToBasket}
                    >Добавить в корзину
                    </button>
                </div>
            </div>
            <div className={`${style.infoWrapper}`}>
                <h2 className={`${style.title}`}>Характеристики:</h2>
                {device.info.map((info, index) => {
                    return <div key={info.id}
                                className={`${style.info} ${index % 2 === 0 ? style.grey : style.white}`}>{info.title}: {info.description}</div>;
                })}
            </div>
        </div>
    );
});

export default DevicePage;