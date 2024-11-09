import { Button } from "antd";
import React from "react";

const ButtonComponent = ({ size, styleButton, styletextbutton, textbutton, isDisabled, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: isDisabled ? '#ccc' : styleButton.background
            }}
            size={size}
            {...rests}
        >
            <span style={styletextbutton}>
                {textbutton}
            </span>
        </Button>
    )
}

export default ButtonComponent