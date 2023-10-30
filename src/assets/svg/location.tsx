import { SVGProps } from 'react'

const LocationIcon = (props: SVGProps<SVGSVGElement>) => (
    // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" {...props} fill="none">
    //     <path
    //         d="M18.3601 6.63989C19.6185 7.89868 20.4754 9.50233 20.8224 11.2481C21.1694 12.9938 20.991 14.8033 20.3098 16.4476C19.6285 18.092 18.4749 19.4974 16.9949 20.4862C15.515 21.475 13.775 22.0028 11.9951 22.0028C10.2152 22.0028 8.47527 21.475 6.99529 20.4862C5.51532 19.4974 4.36176 18.092 3.68049 16.4476C2.99921 14.8033 2.82081 12.9938 3.16784 11.2481C3.51487 9.50233 4.37174 7.89868 5.63012 6.63989"
    //         stroke="#373E97"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //     />
    //     <path
    //         d="M12 2V12"
    //         stroke="#373E97"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //     />
    // </svg>
    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 0 48 48" width="48" {...props}><path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" /><path d="M0 0h48v48h-48z" fill="none" /></svg>

)

export default LocationIcon
