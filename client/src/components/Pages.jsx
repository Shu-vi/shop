import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Pages = observer(() => {
    const {device} = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++){
        pages.push(i + 1);
    }

    return (
        <div style={{display: 'flex'}}>
            {
                pages.map((page) => {
                    const activeStyles = {padding: '2px 7px', border: '1px solid black', cursor: 'pointer', color: '#FFF', backgroundColor: '#000'};
                    const notActiveStyles = {padding: '2px 7px', border: '1px solid black', cursor: 'pointer'}
                    const isActive = device.page === page;
                    return (<div
                        onClick={() => device.setPage(page)}
                        key={page}
                        style={isActive? activeStyles : notActiveStyles}>{page}</div>)
                })
            }
        </div>
    );
});

export default Pages;