import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 0;
    background-color: #fff;
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1024px;
`

export const WrapperLogoHeader = styled.span`
    width: 100%;
    height: auto;
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    alignt-items: center;
    color: #000;  
    font-weight: 600;
    font-size: 14px;
    gap: 5px; 
`

export const WrapperTextHeaderSmall = styled.span`
    color: #000;  
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    padding-top: 5px;
`

export const WrapperContentPopover = styled.p`
    cursor: pointer;
    &:hover{
        color: #f18634;
    }
`

