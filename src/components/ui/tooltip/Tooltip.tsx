import { useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './style.module.scss';
import { createPortal } from 'react-dom';

type TooltipProps = {
    elementId: string;
    children: React.ReactNode;
    visible?: boolean;
};

const tooltipOffsetRem = 0.75;
const rootFontSizePx = parseFloat(getComputedStyle(document.documentElement).fontSize);
const tooltipOffsetPx = rootFontSizePx * tooltipOffsetRem;

function Tooltip({ elementId, children, visible }: TooltipProps) {
    const ref = useRef<HTMLDivElement>(null);
    const cl = clsx(styles.tooltip, visible && styles.visible);

    const [tooltipHeight, setTooltipHeight] = useState(0);
    const [tooltipWidth, setTooltipWidth] = useState(0);
    const [elementHeight, setElementHeight] = useState(0);
    const [elementWidth, setElementWidth] = useState(0);
    const [elementX, setElementX] = useState(0);
    const [elementY, setElementY] = useState(0);

    useLayoutEffect(() => {
        const element = document.getElementById(elementId);

        if (element && ref.current) {
            const elementRect = element.getBoundingClientRect();
            const tooltipRect = ref.current.getBoundingClientRect();

            setTooltipWidth(tooltipRect.width);
            setTooltipHeight(tooltipRect.height);
            setElementX(elementRect.x);
            setElementY(elementRect.y);
            setElementWidth(elementRect.width);
            setElementHeight(elementRect.height);
        }
    }, [visible]);

    const setLeft = () => {
        const documentWidth = document.documentElement.offsetWidth;
        const enoughSpaceRight =
            documentWidth - elementX - elementWidth - tooltipOffsetPx > tooltipWidth;

        if (enoughSpaceRight) {
            return `${elementX + elementWidth + tooltipOffsetPx}px`;
        } else {
            return `${elementX - tooltipWidth - tooltipOffsetPx}px`;
        }
    };

    const setTop = () => {
        const documentHeight = document.documentElement.offsetHeight;
        const enoughSpaceBottom = documentHeight - elementY > tooltipHeight;

        if (enoughSpaceBottom) {
            return tooltipHeight > elementHeight
                ? `${elementY}px`
                : `${elementY + (elementHeight - tooltipHeight) / 2}px`;
        } else {
            return `${elementY + elementHeight - tooltipHeight}px`;
        }
    };

    return createPortal(
        <div className={cl} role='tooltip' style={{ left: setLeft(), top: setTop() }} ref={ref}>
            {children}
        </div>,
        document.body
    );
}

export { Tooltip };
