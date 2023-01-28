import { hsvaToHex } from '@uiw/color-convert';

export const ICON_CONTAINER_BASE_STYLE: object = {
    position: 'relative',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2px',
    margin: '0',
    padding: 0,
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
    iconsGridScrollTop,
}: {
    containerRef: any;
    iconTipRef: any;
    iconContainerRef: any;
    iconsGridScrollTop: number;
}): {
    iconTipLeft: number;
    iconTipTop: number;
} => {
    const containerComputedStyles: any = window.getComputedStyle(containerRef.current);
    const containerRect = containerRef?.current?.getBoundingClientRect();
    const iconContainerRect = iconContainerRef?.current?.getBoundingClientRect();
    const iconTipRect = iconTipRef?.current?.getBoundingClientRect();
    let iconTipLeft = (iconContainerRect.width - iconTipRect.width) * 0.5;
    let iconTipTop = iconContainerRect.height + 2;
    // console.log(iconContainerRef.current.offsetTop);
    if (iconContainerRect.left + iconTipLeft < containerRect.left + parseInt(containerComputedStyles?.getPropertyValue('padding-left') || '0')) iconTipLeft = 0;
    else if (iconContainerRect.left + iconTipLeft + iconTipRect.width > containerRect.left + containerRect.width - parseInt(containerComputedStyles?.getPropertyValue('padding-right') || '0')) iconTipLeft = iconContainerRect.width - iconTipRect.width;
    if (iconContainerRef.current.offsetTop + iconTipTop + iconTipRect.height > iconsGridScrollTop + containerRect.height - parseInt(containerComputedStyles?.getPropertyValue('padding-bottom') || '0')) iconTipTop = -1 * iconTipRect.height - 2;
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
