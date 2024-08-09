import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(26, 148, 255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
`

export const WrapperTextHeader = styled.span`
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    text-align: left;
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    alignt-items: center;
    color: #fff;  
    gap: 10px; 
`

export const WrapperTextHeaderSmall = styled.span`
    color: #fff;  
    font-size: 14px;
    white-space: nowrap;
`

