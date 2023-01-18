import React, {useContext, useMemo} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import style from "../styles/components/pages.module.css";

const Pages = observer(() => {
    const {device} = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = useMemo(() =>
        Array.from({length: pageCount}, (_, i) => i + 1), [device.totalCount, device.limit]
    );

    return (
        <div className={`${style.flex}`}>
            {
                pages.map((page) => {
                    const isActive = device.page === page;
                    return (
                        <div
                            key={page}
                            className={`${isActive ? style.activePage : null} ${style.page}`}
                            onClick={() => device.setPage(page)}
                        >
                            {page}
                        </div>
                    )
                })
            }
        </div>
    );
});

export default Pages;