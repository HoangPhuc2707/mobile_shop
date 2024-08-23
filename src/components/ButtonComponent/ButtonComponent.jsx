import { Button } from "antd";
import React from "react";

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, isDisabled, ...rests }) => {
    return (
        <Button
                style={{
                    ...styleButton,
                    background: isDisabled ? '#ccc' : styleButton.background
                }}
                size={size}
                {...rests}
            >
                <span style={styleTextButton}>
                    {textButton}
                </span>
            </Button>
    )
}

export default ButtonComponent