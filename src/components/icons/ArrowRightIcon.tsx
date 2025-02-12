import { ArrowLeftIcon } from './ArrowLeftIcon';

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return <ArrowLeftIcon style={{ rotate: '180deg' }} {...props} />;
}

export { ArrowRightIcon };
