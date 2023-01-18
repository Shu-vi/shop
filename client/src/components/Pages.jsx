import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import style from "../styles/components/pages.module.css";
const Pages = observer(() => {
    const {device} = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <div className={`${style.flex}`}>
            {
                pages.map((page) => {
                    const isActive = device.page === page;
                    return (<div
                        onClick={() => device.setPage(page)}
                        key={page}
                        className={`${isActive ? style.activePage : null} ${style.page}`}>{page}</div>)
                })
            }
        </div>
    );
});

export default Pages;