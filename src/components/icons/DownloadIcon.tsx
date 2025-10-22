function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width='24px'
            height='24px'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            color='var(--color-icon)'
            {...props}
        >
            <path
                d='M6 20L18 20'
                stroke='var(--color-icon)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            ></path>
            <path
                d='M12 4V16M12 16L15.5 12.5M12 16L8.5 12.5'
                stroke='var(--color-icon)'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
            ></path>
        </svg>
    );
}

export { DownloadIcon };
