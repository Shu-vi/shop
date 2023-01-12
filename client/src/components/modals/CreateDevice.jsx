import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import Select from "../UI/Select";
import {createDevice, fetchBrands, fetchTypes} from "../../http/DeviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({hide, setHidden, ...props}) => {
    const {device} = useContext(Context);
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => {
            device.setTypes(data);
            device.setSelectedType({id: ''});
        })
        fetchBrands().then(data => {
            device.setBrands(data);
            device.setSelectedBrand({id: ''});
        })
    }, [])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => setHidden(true))
    }

    return (
        <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, zIndex: 5,
            backgroundColor: 'rgba(0, 0, 0, .7)', display: 'flex', visibility: hide ? 'hidden' : null
        }}>
            <div style={{zIndex: 10, width: '40%', backgroundColor: '#FFF', margin: 'auto'}}>
                <div style={{
                    height: '20%',
                    borderBottom: '2px solid black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 0'
                }}>
                    <h2>Создать устройство</h2>
                </div>
                <div style={{
                    height: '70%',
                    borderBottom: '2px solid black',
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '10px'
                }}>
                    <Select defaultValue={"Выберите тип"}
                            options={device.types}
                            value={device.selectedType.id}
                            onChange={event => {
                                device.setSelectedType({
                                    id: event.target.value,
                                    name: event.target[event.nativeEvent.target.selectedIndex].text
                                })
                            }}
                            margin={'0 0 10px 0'}/>
                    <Select defaultValue={"Выберите бренд"}
                            options={device.brands}
                            value={device.selectedBrand.id}
                            onChange={event => {
                                device.setSelectedBrand({
                                    id: event.target.value,
                                    name: event.target[event.target.value].text
                                })
                            }}
                            margin={'0 0 10px 0'}/>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder={'Название устройства'}
                           style={{padding: '8px', width: '80%', height: '10%', marginBottom: 10}}/>
                    <input value={price} onChange={e => setPrice(Number(e.target.value))} type={'number'}
                           placeholder={'Цена устройства'}
                           style={{padding: '8px', width: '80%', height: '10%', marginBottom: 10}}/>
                    <input onChange={selectFile} type={'file'} style={{width: '80%', height: '20%', marginBottom: 10}}/>
                    <hr style={{width: '100%', marginBottom: 10}}/>
                    <button onClick={addInfo} style={{
                        padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0)',
                        fontSize: '15px', border: 'solid 2px rgb(0, 0, 0)',
                        borderRadius: '5px', cursor: 'pointer', marginBottom: 10
                    }}>Добавить новое свойство
                    </button>
                    {info.map((info) => {
                        return (<div key={info.number} style={{width: '100%'}}>
                            <div style={{display: 'flex', width: '100%', alignItems: 'center', marginBottom: 10}}>
                                <input value={info.title}
                                       onChange={(e) => changeInfo('title', e.target.value, info.number)}
                                       placeholder={'Введите название'}
                                       style={{padding: '8px', width: '80%', height: '100%', marginRight: 10}}/>
                                <input value={info.description}
                                       onChange={(e) => changeInfo('description', e.target.value, info.number)}
                                       placeholder={'Введите описание'}
                                       style={{padding: '8px', width: '80%', height: '100%', marginRight: 10}}/>
                                <button onClick={() => removeInfo(info.number)} style={{
                                    padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0)',
                                    color: 'rgb(150, 80, 50)', fontSize: '15px', border: 'solid 2px rgb(150, 80, 50)',
                                    borderRadius: '5px', cursor: 'pointer'
                                }}>Удалить
                                </button>
                            </div>
                        </div>)
                    })}
                </div>
                <div style={{height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'end', padding: 12}}>
                    <button onClick={addDevice}
                            style={{
                                padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0)',
                                color: 'rgb(80, 150, 50)', fontSize: '15px', border: 'solid 2px rgb(80, 150, 50)',
                                borderRadius: '5px', cursor: 'pointer', marginRight: 12
                            }}>Добавить
                    </button>
                    <button onClick={() => setHidden(true)} style={{
                        padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0)',
                        color: 'rgb(150, 80, 50)', fontSize: '15px', border: 'solid 2px rgb(150, 80, 50)',
                        borderRadius: '5px', cursor: 'pointer'
                    }}>Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CreateDevice;