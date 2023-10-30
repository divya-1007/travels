import { SVGProps } from 'react'

const SideArrow = (props: SVGProps<SVGSVGElement>) => (
    <>
        <svg
            width="6"
            height="16"
            viewBox="0 0 6 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0.227791 8.42552C0.08455 8.14198 0.0845502 7.80724 0.227791 7.5237L3.35743 1.32862C3.83223 0.38876 5.25 0.726547 5.25 1.77953L5.25 14.1697C5.25 15.2227 3.83223 15.5605 3.35743 14.6206L0.227791 8.42552Z"
                fill="#373E97"
            />
        </svg>

    </>

)

export default SideArrow
