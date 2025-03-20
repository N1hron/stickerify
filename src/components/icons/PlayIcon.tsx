function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
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
                strokeWidth='2.172'
                d='M4.42 1.192a.869.869 0 0 0-1.311.747V22.06a.869.869 0 0 0 1.312.748l16.977-10.06a.87.87 0 0 0 0-1.496z'
            ></path>
        </svg>
    );
}

export { PlayIcon };
