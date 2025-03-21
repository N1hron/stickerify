function ErrorIcon(props: React.SVGProps<SVGSVGElement>) {
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
                strokeWidth='1.669'
                d='M20.95 22.012H3.05c-1.71 0-2.781-1.851-1.928-3.335L10.07 3.114c.855-1.488 3.002-1.488 3.858 0l8.95 15.563c.852 1.484-.219 3.335-1.93 3.335z'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeWidth='1.669'
                d='M12 8.66v4.45'
            ></path>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.669'
                d='m12 17.572.011-.012'
            ></path>
        </svg>
    );
}

export { ErrorIcon };
