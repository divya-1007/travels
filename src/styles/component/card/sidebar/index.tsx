import styled from 'styled-components'
export const MainBox = styled.div`
.subItemsMenu{
    margin-left:20px;
    padding:10px;
    margin-top:10px;
    margin-bottom:10px;

&.active{
    background-color:#fff;
    color:#373e97;
    position:relative;
    &::after{
        content: "";
        position: absolute;
        background: #fdb338;
        left: -9px;
        width: 16px;
        top: 0;
        height: 100%;
    }
    // border-radius: 48px;
    // border-right: 10px solid #373e97;
    .sidearrow{
        path{
    fill:#fff;
        }
    }
    
}}
`
export const Section = styled.div`

&.active{
    background-color:#fff;
    color:#373e97;
    padding-left: 15px;
    // border-radius: 48px;
    position:relative;
    &::after{
        content: "";
        position: absolute;
        background: #fdb338;
        left: -9px;
        width: 15px;
        top: 0;
        height: 100%;
    }
    // border-right: 10px solid #373e97;
    .sidearrow{
        path{
    fill:#fff;
        }
    }
    
}



color:#fff;
display:flex;
padding:15px 10px;
cursor: pointer;
position: relative;
.sidearrow{
    transform: rotate(270deg);
    width: 25px;
    float: right;
    position: absolute;
    right: 10px;
    path{
fill:#fff;
    }
}
 
`
export const TextSection = styled.div`
font-weight:600;

 
`
export const Icon = styled.div`
 `
export const IconSection = styled.div`
margin-right:10px;
 `