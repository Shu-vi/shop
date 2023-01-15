import React, {useContext} from 'react';
import Star from "./Star";
import style from "../styles/components/starList.module.css";
import {createRate} from "../http/RateApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const StarList = observer(({device, ...props}) => {
    const {rate} = useContext(Context);
    const stars = new Array(5);


    const onClickStar = (star) => {
        return () => {
            createRate(star, device)
                .then(data => {
                    rate.setRate(data)
                });
        };
    }

    for (let i = 0; i < 5; i++) {
        stars[i] = <Star onClick={onClickStar(i + 1)} key={i} isOpacity={i < (rate.rate.rate | 0)}/>
    }

    return (
        <div className={`${style.wrapper}`}>
            {stars}
        </div>
    );
});

export default StarList;