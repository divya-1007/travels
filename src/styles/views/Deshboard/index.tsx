import styled from 'styled-components'
import UserPng from "assets/images/user.png"
export const ActivePersion = styled.div`
margin-bottom:20px;
color:#fff;
font-size:20px;
padding:10px 0 20px;
border-bottom:2px solid #ddd;
border-top:2px solid #ddd;
svg{
    height: 33px;
    width:40px;
    fill: #fff;
}
`
export const DashboardFirstItems = styled.div`
a{
    color:#fff !important
}
margin-bottom:30px;
.ant-col:nth-child(1){
    .ant-card-body{
        background:#17a2b8!important;
// background: url(${UserPng});

    }
    }
    .ant-col:nth-child(2){
        .ant-card-body{
            background:#28a745;
        }
    }

        .ant-col:nth-child(3){
            .ant-card-body{
                background:#ffc107;
            }}

            .ant-col:nth-child(4){
                .ant-card-body{
                    background:#dc3545;
              }
              }

`

export const NavBar = styled.div`
margin-left:auto;
span{
    margin-right:15px;
}
svg{
    font-size: 20px;
}
`
export const MenuIcon = styled.div`
svg{
    font-size:25px;
}
`
export const Footer = styled.div`
`

export const MainLogo = styled.img`
cursor: pointer;
object-fit:contain;
`
export const DeshboardItems = styled.p`

`
export const MainBoxContainer = styled.div`
width:100%;
margin-top:10px;
padding:10px;
.ant-card-body{
    position: relative;
    overflow: hidden;
border-radius: 10px;
padding:10px;
// background: hsla(242, 58%, 73%, 1);

// background: linear-gradient(90deg, hsla(242, 58%, 73%, 1) 0%, hsla(157, 72%, 82%, 1) 100%);

// background: -moz-linear-gradient(90deg, hsla(242, 58%, 73%, 1) 0%, hsla(157, 72%, 82%, 1) 100%);

// background: -webkit-linear-gradient(90deg, hsla(242, 58%, 73%, 1) 0%, hsla(157, 72%, 82%, 1) 100%);

// filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#9491E2", endColorstr="#AFF2D8", GradientType=1 );
}

`

export const TextFieldTag = styled.p`
margin:0 0;
`



export const TextFieldTagHeading = styled.h2`
margin:0;
color:#373e97;

`

export const TotalNumber = styled.div`
font-weight: 600;
font-size: 26px;
color: #fff;
`
export const TextField = styled.p`
font-weight: 600;
font-size: 18px;
color: #fff;
margin: 0;
`
export const Counter = styled.div`

    `

export const CardBox = styled.div`

// text-align:center;
min-height: 130px;
justify-content: space-between;
// display:flex;
place-items: center;    
svg{
    opacity: 0.5;
    font-size: 30px;
    fill:#727070;
    margin-bottom: 10px;
    position: absolute;
    right: 10px;
    top: 10%;
    font-size: 60px;
}

`
export const TextParagraph = styled.p` 
cursor: pointer;
color: #fff;
margin: 0px;
text-align: center;
position: absolute;
left: 0;
bottom: 0;
width: 100%;
padding: 5px;
background: #373e9747;
text-transform: capitalize;
text    
svg{
    margin-left: 10px;
}
`
