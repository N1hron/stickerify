function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
                d='m5 13 4 4L19 7'
            ></path>
        </svg>
    );
}

export { CheckIcon };
