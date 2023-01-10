import React, {useEffect, useState} from 'react';
import bitStar from '../assets/bigStar.png';
import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/DeviceApi";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])
    const marginRight = 167;
    const [buttonStyles, setButtonStyles] = useState({backgroundColor: 'rgba(0, 0, 0, 0)', border: '1px solid black',
        borderRadius: '5px', padding: '10px 5px', fontSize: 20, cursor: 'pointer', transition: '.5s'});
        return (
        <div style={{maxWidth: '1340px', margin: '25px auto 0 auto', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
                <div style={{marginRight}}>
                    <img height={300} width={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </div>
                <div style={{marginRight}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h2>{device.name}</h2>
                        <div style={{fontSize: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `url(${bitStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover'}}>
                            {device.rating}
                        </div>
                    </div>
                </div>
                <div style={{marginRight}}>
                    <div style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray',
                        alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around', display: 'flex'}}>
                        <h3 style={{fontWeight: 400}}>От: {device.price} руб.</h3>
                        {
                            <button style={buttonStyles}
                                    onPointerEnter={() => setButtonStyles({backgroundColor: 'rgba(0, 0, 0, 1)', border: '1px solid black',
                                borderRadius: '5px', padding: '10px 5px', fontSize: 20, cursor: 'pointer', color: '#FFF', transition: '.5s'})}
                            onPointerLeave={() => setButtonStyles({backgroundColor: 'rgba(0, 0, 0, 0)', border: '1px solid black',
                                borderRadius: '5px', padding: '10px 5px', fontSize: 20, cursor: 'pointer', transition: '.5s'})}>Добавить в корзину</button>
                        }
                    </div>
                </div>
            </div>
            <div>
                <h2 style={{fontSize: 36, marginBottom: 10}}>Характеристики:</h2>
                {device.info.map((info, index) =>{
                    return <div key={info.id} style={{backgroundColor: index % 2 === 0 ? '#BBB' : '#FFF', fontSize: 20, padding: '10px 5px'}}>{info.title}: {info.description}</div>;
                })}
            </div>
        </div>
    );
};

export default DevicePage;