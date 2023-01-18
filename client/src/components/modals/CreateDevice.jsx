import React, {useContext, useEffect, useState, useRef} from 'react';
import {Context} from "../../index";
import Select from "../UI/Select";
import {createDevice, fetchBrands, fetchTypes} from "../../http/DeviceApi";
import {observer} from "mobx-react-lite";
import styles from "../../styles/components/modals/createDevice.module.css";

const CreateDevice = observer(({hide, setHidden, ...props}) => {
    const {device} = useContext(Context);
    const inputRef = useRef(null);
    const [deviceName, setDeviceName] = useState("");
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes()
            .then((data) => {
                device.setTypes(data);
                device.setSelectedType({id: ""});
            })
            .catch((error) => {
                console.error(error);
            });
        fetchBrands()
            .then((data) => {
                device.setBrands(data);
                device.setSelectedBrand({id: ""});
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    };

    const handleInfoChange = (key, value, number) => {
        setInfo(
            info.map((i) => (i.number === number ? {...i, [key]: value} : i))
        );
    };

    const handleAddInfo = () => {
        setInfo([...info, {title: "", description: "", number: Date.now()}]);
    };

    const handleRemoveInfo = (number) => {
        setInfo(info.filter((i) => i.number !== number));
    };

    const handleAddDevice = () => {
        const formData = new FormData();
        formData.append("name", deviceName);
        formData.append("price", `${price}`);
        formData.append("img", file);
        formData.append("brandId", device.selectedBrand.id);
        formData.append("typeId", device.selectedType.id);
        formData.append("info", JSON.stringify(info));
        createDevice(formData)
            .then(() => {
                setHidden(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleFileClick = () => {
        inputRef.current.click();
    };

    return (
        <div
            className={styles.wrapper}
            style={{
                visibility: hide ? "hidden" : "visible",
            }}
        >
            <div className={styles.modal}>
                <div className={styles.title}>
                    <h2>Создать устройство</h2>
                </div>
                <div className={styles.form}>
                    <Select
                        defaultValue={"Выберите тип"}
                        options={device.types}
                        value={device.selectedType.id}
                        onChange={(event) => {
                            device.setSelectedType({
                                id: event.target.value,
                                name: event.target[event.nativeEvent.target.selectedIndex].text,
                            });
                        }}
                        margin={"0 0 10px 0"}
                    />
                    <Select
                        defaultValue={"Выберите бренд"}
                        options={device.brands}
                        value={device.selectedBrand.id}
                        onChange={(event) => {
                            device.setSelectedBrand({
                                id: event.target.value,
                                name: event.target[event.nativeEvent.target.selectedIndex].text,
                            });
                        }}
                        margin={"0 0 10px 0"}
                    />
                    <input
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        placeholder={"Имя девайса"}
                        className={styles.input}
                    />
                    <input
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        type={"number"}
                        placeholder={"Цена"}
                        className={styles.input}
                    />
                    <div className={styles.fileInputWrapper} onClick={handleFileClick}>
                        <input
                            type="file"
                            onChange={handleFileSelect}
                            className={styles.fileInput}
                            ref={inputRef}
                        />
                        <div className={styles.fileName}>
                            {file ? file.name : "Не выбран файл!"}
                        </div>
                    </div>
                    <div className={styles.infoWrapper}>
                        <div className={styles.infoTitle}>Дополнительная информация</div>
                        {info.map((i) => (
                            <div key={i.number} className={styles.infoRow}>
                                <input
                                    placeholder={"Название"}
                                    value={i.title}
                                    onChange={(e) => handleInfoChange("title", e.target.value, i.number)}
                                    className={styles.input}
                                />
                                <input
                                    placeholder={"Описание"}
                                    value={i.description}
                                    onChange={(e) => handleInfoChange("description", e.target.value, i.number)}
                                    className={styles.input}
                                />
                                <div className={styles.removeInfo} onClick={() => handleRemoveInfo(i.number)}>
                                    X
                                </div>
                            </div>
                        ))}
                        <div className={styles.addInfo} onClick={handleAddInfo}>
                            + Добавить информацию
                        </div>
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.buttonSuccess} onClick={handleAddDevice}>
                        Добавить устройство
                    </button>
                    <button
                        onClick={() => setHidden(true)}
                        className={styles.buttonCancel}
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CreateDevice;


