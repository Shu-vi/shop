import React from 'react';
import style from "../styles/components/star.module.css";
import yellowStar from '../assets/yellowStar.svg';

const Star = ({isOpacity, onClick, ...props}) => {
    return (
        <div onClick={onClick} className={`${isOpacity ? null : style.passiveStar}`}>
            <img className={`${style.img}`} alt='Звезда' src={yellowStar}/>
        </div>
    );
};

export default Star;