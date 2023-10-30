import { SVGProps } from 'react'

const LayoutIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width={24} height={25} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M19 3.975H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-14a2 2 0 0 0-2-2ZM3 9.975h18M9 21.974v-12"
            stroke="#DDD"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export default LayoutIcon
