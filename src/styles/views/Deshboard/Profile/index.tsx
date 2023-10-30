import styled from 'styled-components'
import bannerProfile from 'assets/images/Mountain.jpg'

export const SubHeading = styled.h3`
color:#373e97;
font-size: 20px;
margin-top: 3px;
`

export const AllDetails = styled.div`
height:500px;
overflow:auto;
`
export const ProfileIetms = styled.div`
.profile-user-details {
    padding: 24px;
    top: -56px;
    position: relative;
    .profile-user{
        width: 75px;
        margin: 0 auto;
        line-height: 72px;
        overflow: hidden;
        background: #fff;
        border-radius: 50%;
        height: 75px;
    }
}
text-align:center;
.ant-list-items{
    margin:10px 0;
}
.ant-list-item{
    background-color:#ddd;
    padding:10px 20px;
    margin:5px 0;
    .ant-list-item-meta{
        h4{
            margin-top:0px;
        }
    }
}
button{
    margin:0 auto;}

`
export const AddCandidate = styled.div`
display:flex;
padding-top:10px;

button{
    margin-left:auto;
    margin-bottom:10px ;
}

`
export const Profilepage = styled.div`
.user-profiles{
    .ant-card.ant-card-bordered{
        overflow: hidden;
    }
    .ant-card-body{
        padding: 0;
    }
}
.profile-bg-img {
    background-image: url(${bannerProfile});
    width: 100%;
    height: 99px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.profile-bg-img:after {
    position: absolute;
    content: "";
    background: #6767e7a8;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
height: calc(100vh - 100px);
overflow: auto;
width:100%;
padding:10px;
font-weight:500;
.ant-tabs .ant-tabs-ink-bar {
    background: transparent;}
.ant-tabs-tab-active{
    background: #373e97;
    border-radius: 7px !important;
    padding:0 10px;
    height:42px;
    .ant-tabs-tab-btn{
        color:#fff !important;
    }
}`

export const UserProfiles = styled.div`
`
export const TextBox = styled.div`
display:flex;
width:100%;
// border-top:1px solid #ddd;
border-bottom:1px solid #ddd;
padding:10px 0;
`
export const TextHeading = styled.h4`
width:50%;
font-weight:600;
margin:0px;

`
export const Textdata = styled.div`
width:50%;

`
export const TextHeadingFirst = styled.h3`
margin:0px 0px 15px;


`
