import styled, { keyframes } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import bannerBackground from '../../assets/images/banner6.jpg';

export const WrapperBanner = styled.div`
    display: flex;
    width: 100%;
    height: 360px;
    position: relative;
    background-image: url(${bannerBackground});
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat; 
`

export const WrapperBannerText = styled.div`
    width: 50%;
    margin-left: 60px;
`
const moveUpDown = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(20px); 
    }
    100% {
        transform: translateY(0);
    }
`

export const WrapperBannerImg = styled.div`
    padding-left: 40px;
    animation: ${moveUpDown} 2s ease-in-out infinite;
`
export const WrapperNews = styled.div`
  width: 31%;
  margin-left: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

export const HeaderNews = styled.div`
  background-color: #f47920;
  color: white;
  font-weight: bold;
  padding: 10px;
`;

export const NewsItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

export const NewsImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export const NewsContent = styled.div`
  flex: 1;
`;

export const NewsTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover{
    color: #f18634;
    transition: 0.2s ease;
  }
`;

export const NewsDate = styled.div`
  font-size: 12px;
  color: #999;
`;

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

export const WrapperButtonMore = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`
export const ButtonMore = styled(ButtonComponent)`
    width: 100%;
    align-items: center;
    cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'}
`

export const WrapperHeaderProduct = styled.div`
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
    border: 2px solid #cd1818;
    border-radius: 5px;
`

export const HeaderProduct = styled.div`
    background-color: #cd1818;
    color: white;
    font-weight: bold;
    padding: 10px;
    position: relative;

    span {
      margin-left: 25px;
      font-size: 18px;
    }
`

export const WrapperProducts = styled.div`
    display: flex;
    background: #efefef;
    margin-top: 10px;
    margin-left: 5px;
    gap: 10px;
    justify-content: left;
    flex-wrap: wrap;
`

export const WrapperPromotionImg = styled.div`
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #efefef;
`

export const WrapperRowFeature = styled.div`
    display: flex;
    background-color: #efefef;
    padding-top: 80px;
    padding-left: 30px;
    padding-right: 30px;
`

export const WrapperFeature = styled.div`
    margin-bottom: 30px;

    h3 {
      font-size: 14px;
      color: #2f2f2f;
    }

    p {
      font-size: 14px;
      line-height: 22px;
      color: #6a6a6a;
    }
`

export const FeatureIcon = styled.div`
    display: inline-block;
    position: relative;
    margin-bottom: 20px;

    &:before {
      content: "";
      width: 33px;
      height: 33px;
      position: absolute;
      background: rgba(59, 93, 80, 0.2);
      border-radius: 50%;
      right: -8px;
      bottom: 0;
    }
`