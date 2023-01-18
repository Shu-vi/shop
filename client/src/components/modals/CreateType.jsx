import React, { useState } from 'react';
import { createType } from "../../http/DeviceApi";
import styles from "../../styles/components/modals/modal.module.css";

const CreateType = ({ hide, setHidden, ...props }) => {
    const [typeName, setTypeName] = useState("");

    const handleSubmit = () => {
        createType({ name: typeName })
            .then(() => {
                setTypeName("");
                setHidden(true);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className={styles.wrapper} style={{ visibility: hide ? "hidden" : "visible" }}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    <h2>Создать тип</h2>
                </div>
                <div className={styles.form}>
                    <input
                        placeholder="Название типа"
                        className={styles.input}
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                    />
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.buttonSuccess} onClick={handleSubmit}>
                        Добавить
                    </button>
                    <button className={styles.buttonCancel} onClick={() => setHidden(true)}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateType;