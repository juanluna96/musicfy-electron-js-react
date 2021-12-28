import React from 'react'
import TitleBar from "custom-react-electron-titlebar";

import * as colors from './TitleBarComponent.scss';

const TitleBarComponent = () => {
    let options = {
        backgroundColor: "#101010",
        iconsColor: "#8f8f8f",
        title: "Musicfy",
        titleColor: "#8f8f8f",
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
