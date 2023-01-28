import {useEffect, useRef, useState } from 'react';

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

export const useDebounce = (callback: any, delay: any, dependencies = null) => {
    const timerRef = useRef(null);

    useEffect(() => {
        return () => timerRef.current && clearTimeout(timerRef.current);
    }, dependencies);

    return (...args) => {
        if(timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            callback.apply(null, args);
            timerRef.current = null;
        }, delay);
    }
}