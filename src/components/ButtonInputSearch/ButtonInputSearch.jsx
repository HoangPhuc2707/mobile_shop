import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton,
        backgroundColorInput = '#fff',
        backgroundColorButton = '#f18634',
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
                {...props}
            />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined style={{ color: colorButton }} />}
                styleButton={{
                    borderRadius: '0', background: backgroundColorButton,
                    borderTopRightRadius: '5px', borderBottomRightRadius: '5px',
                    paddingLeft: '30px', paddingRight: '25px',
                }}
                textbutton={textbutton}
                styletextbutton={{ color: colorButton }}
            />
        </div>
    );
};

export default ButtonInputSearch