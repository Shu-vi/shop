import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import Select from "../UI/Select";
import {createDevice, fetchBrands, fetchTypes} from "../../http/DeviceApi";
import {observer} from "mobx-react-lite";
import style from "../../styles/components/modals/createDevice.module.css";

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
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(() => setHidden(true));
    }

    return (
        <div className={`${style.wrapper}`}
             style={{
                 visibility: hide ? 'hidden' : null
             }}>
            <div className={`${style.modal}`}>
                <div className={`${style.title}`}>
                    <h2>Создать устройство</h2>
                </div>
                <div className={`${style.form}`}>
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
                           className={`${style.input}`}/>
                    <input value={price} onChange={e => setPrice(Number(e.target.value))} type={'number'}
                           placeholder={'Цена устройства'}
                           className={`${style.input}`}/>
                    <input onChange={selectFile} type={'file'} className={`${style.input}`}/>
                    <hr className={`${style.hr}`}/>
                    <button onClick={addInfo} className={`${style.button}`}>Добавить новое свойство
                    </button>
                    {info.map((info) => {
                        return (<div key={info.number} className={`${style.width100}`}>
                            <div className={`${style.wrapperInfos}`}>
                                <input value={info.title}
                                       onChange={(e) => changeInfo('title', e.target.value, info.number)}
                                       placeholder={'Введите название'}
                                       className={`${style.input2}`}/>
                                <input value={info.description}
                                       onChange={(e) => changeInfo('description', e.target.value, info.number)}
                                       placeholder={'Введите описание'}
                                       className={`${style.input2}`}/>
                                <button onClick={() => removeInfo(info.number)}
                                        className={`${style.buttonCancel}`}>Удалить
                                </button>
                            </div>
                        </div>)
                    })}
                </div>
                <div className={`${style.buttonWrapper}`}>
                    <button onClick={addDevice}
                            className={`${style.buttonSuccess}`}>Добавить
                    </button>
                    <button onClick={() => setHidden(true)} className={`${style.buttonCancel}`}>Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CreateDevice;