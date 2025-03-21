function LoadingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            color='var(--color-icon)'
            viewBox='0 0 24 24'
            {...props}
        >
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.674'
                d='M12 .837v4.465'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.674'
                d='M12 18.698v4.465'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.674'
                d='M23.163 12h-4.465'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.674'
                d='M5.302 12H.837'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.674'
                d='m4.107 4.107 3.157 3.157'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.674'
                d='m16.736 16.736 3.157 3.157'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.674'
                d='m19.893 4.107-3.157 3.157'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.674'
                d='m7.264 16.736-3.157 3.157'
            ></path>
        </svg>
    );
}

export { LoadingIcon };
