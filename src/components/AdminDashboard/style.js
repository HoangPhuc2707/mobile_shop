import styled from "styled-components";

export const DashboardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
    margin-right: 30px;
`;

export const DashboardCard = styled.div`
    display: flex;
    align-items: center;
    width: 290px;
    height: 140px;
    border-radius: 12px;
    background: linear-gradient(145deg, #ffffff, #f0f2f5);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    padding: 20px;
    position: relative;
    overflow: hidden;
    
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 10% 20%, rgba(22, 119, 255, 0.1) 0%, transparent 50%);
        z-index: 0;
    }
    
    > * {
        position: relative;
        z-index: 1;
    }
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        background: linear-gradient(145deg, #ffffff, #e6e9ef);
    }
`

export const DashboardCardBg = styled.img`
    width: 48px;
    height: 48px;
    margin-right: 20px;
    filter: brightness(0) saturate(100%) invert(29%) sepia(62%) saturate(3511%) hue-rotate(201deg) brightness(97%) contrast(101%);
    transition: transform 0.3s ease;
        
    ${DashboardCard}:hover & {
        transform: scale(1.1);
    }
`

export const DashboardCardTittle = styled.div`
    font-size: 16px;
    color: #1a1a1a;
    font-weight: 500;
    margin-bottom: 8px;
    font-family: 'Inter', sans-serif;
`

export const DashboardCardData = styled.div`
    font-size: 36px;
    color: #1677ff;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    opacity: ${props => props.isPending ? 0.5 : 1};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
`

export const StatItem = styled.div`
    flex: 1;
    min-width: 200px;
    padding: 16px;
    text-align: center;
    
    > div:first-child {
        font-size: 16px;
        color: #637381;
        font-family: 'Inter', sans-serif;
        margin-bottom: 8px;
    }
`;