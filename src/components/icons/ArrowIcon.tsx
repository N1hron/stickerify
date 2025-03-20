function ArrowIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' {...props}>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2.66667'
                d='M 17.333305,1.333334 6.6666394,12 17.333305,22.666666'
            ></path>
        </svg>
    );
}

export { ArrowIcon };
