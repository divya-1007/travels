import styled from 'styled-components'

export const MainContainer = styled.div`

  background-color: #373e97;
  box-shadow: 1px 0px 0px #dadbf1;
  min-height: 90vh;
  overflow:auto;
  max-height: calc(100vh - 100px);
  max-width: 240px;
  padding: 15px 0px;
  width: 100%;
  transition: margin 0.25s ease-in-out;

  &.hide {
    margin-left: -278px;
  }
`
export const Wrapper = styled.div`
max-width:100%;
overflow:hidden;

`
