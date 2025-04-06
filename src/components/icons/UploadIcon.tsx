function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            strokeWidth='1.5'
            color='var(--color-icon)'
            viewBox='0 0 24 24'
            {...props}
        >
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 20h12M12 16V4m0 0 3.5 3.5M12 4 8.5 7.5'
            ></path>
        </svg>
    );
}

export { UploadIcon };
