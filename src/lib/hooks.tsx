import React, { RefObject, useEffect, useRef, useState } from 'react';

// This hook listens to the resizing of an element
export const useElementSize = (): [
    elementRef: any,
    size: { width: number; height: number }
] => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const resizeObserver = new ResizeObserver(
            ([
                {
                    target: { clientHeight, clientWidth },
                },
            ]) => setSize({ width: clientWidth, height: clientHeight })
        );
        elementRef?.current && resizeObserver.observe(elementRef?.current);
        return () => resizeObserver.disconnect();
    }, []);

    return [elementRef, size];
};

export const useEventOutside = (
    event: string,
    elementRefs: any[],
    callback: (e: Event) => void
): void => {
    useEffect(() => {
        const listener = (e: Event) => {
            let outside = true;
            for (const ref of elementRefs) {
                if (!ref?.current || ref?.current?.contains(e.target)) {
                    outside = false;
                    return;
                }
            }
            callback(e);
        };
        document.addEventListener(event, listener);
        return () => document.removeEventListener(event, listener);
    }, [elementRefs, callback]);
};

export const useIconsContainerRowColCounts = (
    iconsContainerRef: any,
    iconContainerStyle: any
): { rowCount: number; colCount: number } => {
    const iconsContainerComputedStyles =
        iconsContainerRef.current &&
        window.getComputedStyle(iconsContainerRef.current);
    const iconsContainerRowGap = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('row-gap')
    );
    const iconsContainerColGap = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('column-gap')
    );
    const iconsContainerHeight = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('height')
    );
    const iconsContainerWidth = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('width')
    );
    const iconsContainerPaddingTop = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('padding-top')
    );
    const iconsContainerPaddingLeft = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('padding-left')
    );
    const iconsContainerPaddingRight = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('padding-right')
    );
    const iconContainerHeight = parseInt(iconContainerStyle?.height);
    const iconContainerWidth = parseInt(iconContainerStyle?.width);
    const [rowCount] = useState((Math.floor(
        (iconsContainerHeight -
            iconsContainerPaddingTop -
            iconContainerHeight) /
            (iconContainerHeight + iconsContainerRowGap)
    ) || 0) + 1);
    const [colCount] = useState(((Math.floor(
        (iconsContainerWidth -
            iconsContainerPaddingLeft -
            iconsContainerPaddingRight -
            iconContainerWidth) /
            (iconContainerWidth + iconsContainerColGap)
    ) || 0) + 1));
    return { rowCount, colCount }
};
