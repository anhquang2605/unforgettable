import React, { useState, useEffect } from 'react';
import "./overlaymessage.css";
/*
Set trigger overlay in the component that use this component
toggle will fade in and out the overlay
message is the message in the message box
 */
const OverlayMessage = (props) => {
    const [fadeToggle, setfadeToggle] = useState(false);//false not reveal, true reveal
    useEffect(() => {
        setfadeToggle(props.toggle);
    }, [props.toggle]);
    return (
        <div id={props.id} className={"overlay-message-box" + (fadeToggle?"" : " hide-overlay")}>
            <div className="overlay-screen">
            </div>
            <div className="message">
                {props.children}
            </div>
        </div>
    );
}

export default OverlayMessage;
