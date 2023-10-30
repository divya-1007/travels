import styled from 'styled-components'


export const TableContainer = styled.div`
.anticon {
  svg{
    cursor: pointer;
  }
}
.ant-table-tbody .ant-table-row:nth-child(1) .ant-table-cell .sc-cOxWqc{
  top:0 !important;
  bottom:auto !important;
}


`

export const ActionContainer = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
  align-items: center;
  place-content: center;
`
export const ActionText = styled.div`
  font-family: 'PoppinsMedium';
  font-size: 16px;
  line-height: 124%;
  letter-spacing: 0.005em;
  color: #363b98;
  cursor: pointer;
`
export const ActionViewModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: left;
  // padding: 16px 24px 16px 16px;
  // gap: 10px;
  // background: #ffffff;
  // box-shadow: 0px 6px 15px rgba(55, 62, 151, 0.16);
  // border-radius: 8px;
  // top: 51px;
  // width: 120px;
  // right: 0px;
  // z-index: 1;
  padding: 16px 24px 16px 16px;
  gap: 10px;
  background: #ffffff;
  box-shadow: 0px 6px 15px rgba(55,62,151,0.16);
  border-radius: 8px;
  bottom: 0px;
  width: 120px;
  left: 100%;
  z-index: 99999999;
`
export const ActionViewText = styled.div`
  font-family: 'PoppinsMedium';
  font-size: 14px;
  cursor: pointer;
  line-height: 21px;
  color: #373e97;
  
`
export const ActionSecondaryModal = styled.div`
right: 40px;
`
export const AllDataShow = styled.div`

`


