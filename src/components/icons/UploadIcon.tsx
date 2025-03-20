function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            color='var(--color-icon)'
            viewBox='0 0 24 24'
            {...props}
        >
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M3.771 22.971H20.23'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.5'
                d='M12 17.486V1.029m0 0 4.8 4.8m-4.8-4.8-4.8 4.8'
            ></path>
        </svg>
    );
}

export { UploadIcon };
