import { hsvaToHex } from '@uiw/color-convert';
import { RefObject } from 'react';

export const ICON_CONTAINER_BASE_STYLE: object = {
    position: 'relative',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2px',
};

export const ICON_BASE_STYLE = ({
    hsva,
}: {
    hsva: { h: number; s: number; v: number; a: number };
}): object => ({
    color: hsvaToHex(hsva),
    cursor: 'pointer',
});

export const getIconTipPosition = ({
    containerRef,
    iconTipRef,
    iconContainerRef,
}: {
    containerRef: RefObject<HTMLElement>;
    iconTipRef: RefObject<HTMLElement>;
    iconContainerRef: RefObject<HTMLElement>;
}): {
    iconTipLeft: number;
    iconTipTop: number;
} => {
    const iconsContainerRect = containerRef.current?.getBoundingClientRect();
    const iconContainerRect = iconContainerRef.current?.getBoundingClientRect();
    const iconTipRect = iconTipRef.current?.getBoundingClientRect();
    let iconTipLeft = (iconContainerRect.width - iconTipRect.width) * 0.5;
    let iconTipTop = iconContainerRect.height + 2;
    if(iconContainerRect.left + iconTipLeft < iconsContainerRect.left + 2) iconTipLeft = 0;
    else if(iconContainerRect.left + iconTipLeft + iconTipRect.width + 2 > iconsContainerRect.left + containerRef.current?.clientWidth) iconTipLeft = iconContainerRect.width - iconTipRect.width;
    if(iconContainerRect.top + iconTipTop + iconTipRect.height + 2 > iconsContainerRect.top + iconsContainerRect.height) iconTipTop = -1 * iconTipRect.height - 2;
    return { iconTipTop, iconTipLeft };
};

export const ICON_TIP_BASE_STYLE = ({
    top = 0,
    left = 0,
}: {
    top: number;
    left: number;
}): object => {
    return {
        position: 'absolute',
        zIndex: '10',
        top: top + 'px',
        left: left + 'px',
        width: 'fit-content',
        height: 'fit-content',
        backgroundColor: '#222222',
        color: '#FFFFFF',
        boxSizing: 'border-box',
        padding: '7px',
        fontFamily: 'Arial serif',
        fontSize: '12px',
        borderRadius: '3px',
    };
};
