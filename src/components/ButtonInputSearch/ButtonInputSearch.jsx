import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton, 
        backgroundColorInput = '#fff',
        backgroundColorButton = 'rgb(13, 92, 182)',
        colorButton = '#fff',
    } = props;
    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                style={{
                    backgroundColor: backgroundColorInput, borderRadius: '0',
                    borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px',
                }}
            />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined style={{ color: colorButton}}/>}
                bordered={false}
                styleButton={{
                    borderRadius: '0', background: backgroundColorButton,
                    borderTopRightRadius: '5px', borderBottomRightRadius: '5px',
                }}
                textButton={textButton}
                styleTextButton={{ color: colorButton  }}
            />
        </div>
    );
};

export default ButtonInputSearch