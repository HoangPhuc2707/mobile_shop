import { Row } from "antd";
import styled from "styled-components";

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

export const WrapperRowNews = styled(Row)`
    background: #fff;
    margin: 0 30px;
    padding-top: 20px;
`

export const NewsLeftImg = styled.img`
    width: 540px;
    height: 282px; 
    border-radius: 10px; 
    cursor: pointer; 
`

export const NewsRightImg = styled.img`
    width: 280px;
    height: 82px; 
    margin: 2px 0;
    cursor: pointer; 
`

export const NewsTittle = styled.div`
    margin-top: 80px;
    line-height: 1.2;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
    cursor: pointer;
`

export const NewsDate = styled.div`
    color: #adadad;
    font-size: 12px;
    margin-bottom: 5px;
`

export const NewsContent = styled.div`
    color: #2e3a47;
    line-height: 1.5;
    font-size: 14px;
`

export const WrapperListNews = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    margin: 0 30px;
    padding-top: 20px;
    padding-bottom: 40px;
`
export const ListNews = styled.div`
    width: 360px; 
    height: 410px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer; 
    box-shadow: 0px 4px 6px rgb(192, 191, 191);
    margin: 20px 20px 0 20px;
`

export const ListNewsImg = styled.img`
    width: 360px;
    height: 250px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
`

export const WrapperListNewsTittle = styled.div`
    padding: 10px 10px 0 10px; 
`

export const ListNewsTittle = styled.h2`
    font-size: 18px;
    padding: 10px 10px 0;
    border-left: 5px solid #f18634;
    border-right: 5px solid #f18634;
    line-height: 1.2;
    font-weight: 500;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 45px;
`

export const ListNewsContent = styled.div`
    font-size: 14px;
    line-height: 1.5;
    color: #8a8a8a;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 45px;
`

export const ListNewsDate = styled.p`
    color: #adadad;
    font-size: 12px;
    margin-bottom: 5px;
    padding-left: 10px;
    margin-top: 3px;
`