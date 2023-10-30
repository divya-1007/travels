import styled from 'styled-components'



export const ReportSection = styled.div`
.ant-select-selector{
    min-width:150px;
}
.searchFilter{
    background-color: #373e97;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    width: 101px;
    height: 40px;
}
`
export const ItemsList = styled.div`
margin-top:15px;
border-bottom:1px solid #ddd;
padding-bottom:5px;
`

export const TopSection = styled.div`
display:flex;
justify-content: space-between;

`

export const ReviewsBox = styled.div`
display:flex;
margin-top:15px;
`
export const ReviewsPerson = styled.div`
padding-left:15px;
h3{
    margin:0;
}
p{
    margin:0;
    span{
        margin-left:20px;
    }
}

`
export const Description = styled.p`
color: #9aa5af;
`


export const MainBoxContainer = styled.div`
height: calc(100vh - 100px);
overflow: auto;
width:100%;
padding:15px;

`
export const TextData = styled.p`
margin: 0;
font-size: 18px;
    color: #9aa5af;
`
export const Image = styled.p`
img{
    width: 36px;
    height: 36px;
}
`

export const TextValue = styled.h3`
margin: 0;
    line-height: 100%;
    color: #1273eb;
    font-size: 1.4rem;

`
