import React, {useState} from 'react';
import {createBrand} from "../../http/DeviceApi";

const CreateBrand = ({hide, setHidden, ...props}) => {
    const [value, setValue] = useState('');
    return (
        <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 5,
            backgroundColor: 'rgba(0, 0, 0, .7)', display: 'flex', visibility: hide ? 'hidden' : null
        }}>
            <div style={{zIndex: 10, width: '40%', height: '50%', backgroundColor: '#FFF', margin: 'auto'}}>
                <div style={{
                    height: '20%',
                    borderBottom: '2px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h2>Создать бренд</h2>
                </div>
                <div style={{
                    height: '50%',
                    borderBottom: '2px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <input placeholder={'Название бренда'} style={{padding: '8px', width: '80%', height: '20%'}}
                           value={value} onChange={(e) => setValue(e.target.value)}/>
                </div>
                <div style={{height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                    <button style={{
                        padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0)',
                        color: 'rgb(80, 150, 50)', fontSize: '15px', border: 'solid 2px rgb(80, 150, 50)',
                        borderRadius: '5px', cursor: 'pointer', marginRight: 12
                    }} onClick={() => {
                        createBrand({name: value}).then(() => {
                            setValue('');
                            setHidden(true);
                        })
                    }}>Добавить
                    </button>
                    <button onClick={() => setHidden(true)} style={{
                        padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0)',
                        color: 'rgb(150, 80, 50)', fontSize: '15px', border: 'solid 2px rgb(150, 80, 50)',
                        borderRadius: '5px', cursor: 'pointer', marginRight: 12
                    }}>Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBrand;