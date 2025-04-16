import { Col } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled.div`
    display: flex;
    gap: 15px;
    justify-content: left;
    flex-wrap: wrap;
    padding-top: 20px;
`

export const WrapperTypeProduct = styled.div`
    display: flex;
    margin-left: 100px;
    align-items: center;
    justify-content: flex-start;
`

export const WrapperSubMenuType = styled.div`
  position: relative;
  padding: 14px 20px;
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: #f18634;
  }
  &:hover .subMenuType{
   display: block;
  }
`

export const WrapperType = styled.div`
  position: relative;
  padding: 14px 20px;
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: #f18634;
  }
`

export const SubMenuType = styled.div`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
    list-style: none;
    margin: 0;
    padding: 0;
    min-width: 200px;
    z-index: 10;
    &:hover {
      display: block;
    }
`