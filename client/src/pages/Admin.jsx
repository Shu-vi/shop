import React, {useState} from 'react';
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
    const [brandHidden, setBrandHidden] = useState(true);
    const [typeHidden, setTypeHidden] = useState(true);
    const [deviceHidden, setDeviceHidden] = useState(true);
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <button onClick={() => setTypeHidden(false)}>Добавить тип</button>
            <button onClick={() => setBrandHidden(false)}>Добавить бренд</button>
            <button onClick={() => setDeviceHidden(false)}>Добавить устройство</button>
            <CreateBrand hide={brandHidden} setHidden={setBrandHidden}/>
            <CreateType hide={typeHidden} setHidden={setTypeHidden}/>
            <CreateDevice hide={deviceHidden} setHidden={setDeviceHidden}/>
        </div>
    );
};

export default Admin;