import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './style.module.scss';

type TooltipProps = {
    targetId: string;
    children: React.ReactNode;
};

const tooltipOffsetRem = 0.75;
const rootFontSizePx = parseFloat(getComputedStyle(document.documentElement).fontSize);
const tooltipOffsetPx = rootFontSizePx * tooltipOffsetRem;

function Tooltip({ targetId, children }: TooltipProps) {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<Element>(null);

    const [tooltipHeight, setTooltipHeight] = useState(0);
    const [tooltipWidth, setTooltipWidth] = useState(0);
    const [targetHeight, setElementHeight] = useState(0);
    const [targetWidth, setElementWidth] = useState(0);
    const [targetX, setElementX] = useState(0);
    const [targetY, setElementY] = useState(0);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const target = document.getElementById(targetId);
        targetRef.current = target;

        const showTooltip = () => setVisible(true);
        const hideTooltip = () => setVisible(false);

        target?.addEventListener('mouseenter', showTooltip);
        target?.addEventListener('mouseleave', hideTooltip);

        return () => {
            target?.removeEventListener('mouseenter', showTooltip);
            target?.removeEventListener('mouseleave', hideTooltip);
        };
    }, []);

    useLayoutEffect(() => {
        const target = targetRef.current;
        const tooltip = tooltipRef.current;

        if (target && tooltip) {
            const targetRect = target.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            setTooltipWidth(tooltipRect.width);
            setTooltipHeight(tooltipRect.height);
            setElementX(targetRect.x);
            setElementY(targetRect.y);
            setElementWidth(targetRect.width);
            setElementHeight(targetRect.height);
        }
    }, [visible]);

    const setLeft = () => {
        const documentWidth = document.documentElement.offsetWidth;
        const enoughSpaceRight =
            documentWidth - targetX - targetWidth - tooltipOffsetPx > tooltipWidth;

        if (enoughSpaceRight) {
            return `${targetX + targetWidth + tooltipOffsetPx}px`;
        } else {
            return `${targetX - tooltipWidth - tooltipOffsetPx}px`;
        }
    };

    const setTop = () => {
        const documentHeight = document.documentElement.offsetHeight;
        const enoughSpaceBottom = documentHeight - targetY > tooltipHeight;

        if (enoughSpaceBottom) {
            return tooltipHeight > targetHeight && tooltipHeight > rootFontSizePx * 1.5625
                ? `${targetY}px`
                : `${targetY + (targetHeight - tooltipHeight) / 2}px`;
        } else {
            return `${targetY + targetHeight - tooltipHeight}px`;
        }
    };

    if (!visible) return null;
    return createPortal(
        <div
            className={styles.tooltip}
            role='tooltip'
            style={{ left: setLeft(), top: setTop() }}
            ref={tooltipRef}
        >
            {children}
        </div>,
        document.body
    );
}

export { Tooltip };
