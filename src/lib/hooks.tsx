import { useEffect, useRef, useState } from "react"

// This 
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
}