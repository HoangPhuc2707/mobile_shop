import { Button, Input } from "antd";
import React from "react";
import { SearchOutlined } from '@ant-design/icons';

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton, 
        backgroundColorInput = '#fff',
        backgroundColorButton = 'rgb(13, 92, 182)',
        colorButton = '#fff',
    } = props;
    return (
        <div style={{ display: 'flex' }}>
            <Input
                size={size}
                placeholder={placeholder}
                style={{
                    backgroundColor: backgroundColorInput, borderRadius: '0',
                    borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px',
                }}
            />
            <Button
                size={size}
                icon={<SearchOutlined style={{ color: colorButton}}/>}
                bordered={false}
                style={{
                    borderRadius: '0', background: backgroundColorButton,
                    borderTopRightRadius: '5px', borderBottomRightRadius: '5px',
                }}
            >
                <span style={{color: colorButton}}>
                    {textButton}
                </span>
            </Button>
        </div>
    );
};

export default ButtonInputSearch