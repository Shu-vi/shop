import React, {useState} from 'react';
import {createBrand} from "../../http/DeviceApi";
import style from "../../styles/components/modals/modal.module.css";

const CreateBrand = ({hide, setHidden, ...props}) => {
    const [value, setValue] = useState('');
    return (
        <div className={`${style.wrapper}`}
             style={{
                 visibility: hide ? 'hidden' : null
             }}>
            <div className={`${style.modal}`}>
                <div className={`${style.title}`}>
                    <h2>Создать бренд</h2>
                </div>
                <div className={`${style.form}`}>
                    <input placeholder={'Название бренда'} className={`${style.input}`}
                           value={value} onChange={(e) => setValue(e.target.value)}/>
                </div>
                <div className={`${style.buttonWrapper}`}>
                    <button className={`${style.buttonSuccess}`} onClick={() => {
                        createBrand({name: value}).then(() => {
                            setValue('');
                            setHidden(true);
                        })
                    }}>Добавить
                    </button>
                    <button onClick={() => setHidden(true)} className={`${style.buttonCancel}`}>Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateBrand;