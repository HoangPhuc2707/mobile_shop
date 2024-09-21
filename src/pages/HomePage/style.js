import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
`
export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #9255FD;
        span {
            color: #fff;
        }
    }
    width: 100%;
    align-items: center;
    cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'}
`

export const WrapperProducts = styled.div`
    display: flex;
    margin-top: 20px;
    gap: 20px;
    justify-content: left;
    flex-wrap: wrap;
`