import React, {useContext} from 'react';
import Star from "./Star";
import style from "../styles/components/starList.module.css";
import {createRate} from "../http/RateApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const StarList = observer(({device: {id}, ...props}) => {
    const {rate} = useContext(Context);


    const onClickStar = (star) => {
        return () => {
            createRate(star, id)
                .then(data => {
                    rate.setRate(data)
                });
        };
    }

    const stars = new Array(5).fill(0).map((_, i) =>
        (<Star onClick={onClickStar(i + 1)} key={i} isOpacity={i < (rate.rate.rate | 0)}/>)
    );


    return (
        <div className={`${style.wrapper}`}>
            {stars}
        </div>
    );
});

export default StarList;