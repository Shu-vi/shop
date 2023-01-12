import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const TypeBar = observer(({children, ...props}) => {
    const {device} = useContext(Context);
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            {
                device.types.map((type) => {
                    const isSelected = type.id === device.selectedType.id;
                    const selectedStyles = {
                        border: '1px solid black', cursor: 'pointer', padding: '15px',
                        textAlign: 'center', color: '#FFF', backgroundColor: '#000'
                    };
                    const notSelectedStyles = {
                        border: '1px solid black',
                        cursor: 'pointer',
                        padding: '15px',
                        textAlign: 'center'
                    };
                    return (
                        <div key={type.name} style={isSelected ? selectedStyles : notSelectedStyles} onClick={() => {
                            device.setSelectedType(type)
                        }}>
                            {type.name}
                        </div>)
                })
            }
        </div>
    );
});

export default TypeBar;