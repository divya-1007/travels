import { ReactElement, FC } from 'react'
import { StyledButton } from '../../styles/component/Button/index'

export interface IButtonProps {
    label: ReactElement | string
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    variant?: 'contained' | 'outline'
    disabled?: boolean
    icon?: ReactElement
}

const Button: FC<IButtonProps> = ({ variant, icon, label, type, ...rest }: IButtonProps) => (
    <StyledButton {...rest} type={type} variant={variant}>
        {icon}
        {label}
    </StyledButton>
)

export default Button
