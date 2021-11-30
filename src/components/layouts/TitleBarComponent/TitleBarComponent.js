import React from 'react'
import TitleBar from "custom-react-electron-titlebar";

import * as colors from './TitleBarComponent.scss';

const TitleBarComponent = () => {
    let options = {
        backgroundColor: "#101010",
        iconsColor: "#9e9e9e",
        title: "Musicfy",
        titleColor: "#9e9e9e",
        icon: true,
        closeIconClass: "close icon",
        maximizeIconClass: "window maximize outline icon",
        minimizeIconClass: "window minimize icon"
    }

    return (
        <TitleBar options={ options } />
    )
}

export default TitleBarComponent
