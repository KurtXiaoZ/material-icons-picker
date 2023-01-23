import React, { RefObject, useEffect, useRef, useState } from "react"

// This hook listens to the resizing of an element
export const useElementSize = (): [
    elementRef: React.Ref<HTMLDivElement>,
    size: { width: number, height: number },
] => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        const resizeObserver = new ResizeObserver(([{ target: { clientHeight, clientWidth } }]) => setSize({ width: clientWidth, height: clientHeight }));
        elementRef?.current && resizeObserver.observe(elementRef?.current);
        return () => resizeObserver.disconnect();
    }, []);

    return [elementRef, size];
};

export const useEventOutside = (event: string, elementRefs: any[], callback: (e: Event) => void): void => {
    useEffect(() => {
        const listener = (e: Event) => {
            let outside = true;
            for(const ref of elementRefs) {
                if (!ref?.current || ref?.current?.contains(e.target)) {
                    outside = false;
                    return;;
                }
            }
            callback(e);
        };
        document.addEventListener(event, listener);
        return () => document.removeEventListener(event, listener);
    }, [elementRefs, callback]);
};

export const useLazyLoad = (containerDataset: string, childrenDataset: string): void => {
    useEffect(() => {
        let n = 0;
        const container = document.querySelector(`[${containerDataset}]`);
        const children: any = document.querySelectorAll(`[${childrenDataset}]`);
        children.forEach((child: any) => child.style.visibility = 'hidden');

        const lazyload = () => {
            for(let i = n; i < children.length; ++i) {
                console.log(children[i].offsetTop, container.clientHeight, container.scrollTop)
                if(children[i].offsetTop < container.clientHeight + container.scrollTop) {
                    children[i].style.visibility = 'visible';
                    n = i + 1;
                }
                else break;
            }
        }

        container?.addEventListener('scroll', lazyload);
        lazyload();
    }, [containerDataset, childrenDataset]);
};