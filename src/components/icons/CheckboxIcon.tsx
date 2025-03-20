function CheckboxIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' {...props}>
            <path
                stroke='var(--color-icon)'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='4.351'
                d='m2.175 13.404 3.106 3.105 2.508 2.509 9.955-9.955 4.08-4.08'
            ></path>
        </svg>
    );
}

export { CheckboxIcon };
