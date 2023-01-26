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

/**
 * Get a throttled version of a function
 * @param {Function} callback the original function
 * @param {Number} limit time limit of the callback
 * @param {Array} dependencies dependencies of the throttled function
 * @returns the throttled version of the function
 */
export const useThrottle = (callback: any, limit: any, dependencies: any = null) => {
    const waiting = useRef(false);
    const timerRef = useRef<any>();

    useEffect(() => {
        return () => {
            waiting.current = false;
            timerRef.current && clearTimeout(timerRef.current);
        }
    }, dependencies);

    const throttledCallback = (...args) => {
        if(!waiting.current) {
            callback.call(null, ...args);
            waiting.current = true;
            timerRef.current = setTimeout(() => {
                waiting.current = false;
            }, limit)
        }
    };

    return throttledCallback;
}