import styled from 'styled-components'

interface IStyledButton {
  variant?: 'contained' | 'outline'
}
const getButtonStyles = ({ variant }: IStyledButton) => {
  switch (variant) {
    case 'contained':
      return `
      background: "#373e97";
      color: #fff;
      border: none;
      `
    case 'outline':
      return `
      background: none;
      color: #fff;
      border: 1px solid #fff;
      `
    default:
      return `
      background: "#373e97";
      color:#fff;
      border: none;
  `
  }
}

export const StyledButton = styled.button<IStyledButton>`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  font-family: 'PoppinsSemiBold';
  max-width: 372px;
  min-width: 170px;
  // width: 100%;
  ${({ variant }) => getButtonStyles({ variant })}
  text-align: center;
  background: #373e97;
  color: #fff;
  padding: 10px 0;
  border-radius: 16px;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`
