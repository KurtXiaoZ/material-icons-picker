import {RefObject, useEffect, useRef, useState } from 'react';

// This hook listens to the resizing of an element
export const useElementSize = <T extends Element,>(): [
    elementRef: RefObject<T>,
    size: { width: number; height: number }
] => {
    const elementRef = useRef<T | null>(null);
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

/**
 * This hook registers a callback that listens to an event fired outside of one or more elements 
 * @param event name of the event, used in addEventListener
 * @param elementRefs an array of the refs of target elements
 * @param callback the event listener
 */
export const useEventOutside = (
    event: string,
    elementRefs: RefObject<Element>[],
    callback: (e: Event) => void
): void => {
    useEffect(() => {
        const listener = (e: Event) => {
            let outside = true;
            for (const ref of elementRefs) {
                if (!ref?.current || ref?.current?.contains(e.target as HTMLElement)) {
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
 * Get the debounced version of a function
 * @param callback the original function
 * @param delay the value of delay for the debounced function
 * @param dependencies an array of states and props whose changes terminate the debounced function
 * @returns the debounced function
 */
export const useDebounce = (callback: (...args: any[]) => any, delay: number, dependencies = null) => {
    const timerRef = useRef(null);

    useEffect(() => {
        return () => timerRef.current && clearTimeout(timerRef.current);
    }, dependencies);

    return (...args: any) => {
        if(timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            callback.apply(null, args);
            timerRef.current = null;
        }, delay);
    }
};

/**
 * Trigger callback function after a state or prop is updated
 * @param callback handler that triggers when the dependencies update
 * @param dependencies dependencies of the callbacks
 * @param cleanUp clean up function that triggers when the dependencies update
 */
export const useUpdate = (callback: (...args: any) => any, dependencies?: any[], cleanUp?: (...args: any) => void) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false;
            return;
        }
        if(typeof callback === 'function') callback();
        if(typeof cleanUp === 'function') return cleanUp();
    }, dependencies);
}