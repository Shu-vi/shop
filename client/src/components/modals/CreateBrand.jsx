import React, { useState } from 'react';
import { createBrand } from "../../http/DeviceApi";
import styles from "../../styles/components/modals/modal.module.css";

const CreateBrand = ({ hide, setHidden, ...props }) => {
    const [brandName, setBrandName] = useState("");

    const handleSubmit = () => {
        createBrand({ name: brandName }).then(() => {
            setBrandName("");
            setHidden(true);
        });
    };

    return (
        <div className={styles.wrapper} style={{ visibility: hide ? "hidden" : "visible" }}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    <h2>Создать бренд</h2>
                </div>
                <div className={styles.form}>
                    <input
                        placeholder="Название бренда"
                        className={styles.input}
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
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

export default CreateBrand;