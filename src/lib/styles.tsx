import { hsvaToHex } from '@uiw/color-convert';
import { RefObject } from 'react';

export const CONTAINER_BASE_STYLE: object = {
    width: '100%',
    minWidth: '230px',
    height: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.25) 1px 1px 7px 2px',
    display: 'flex',
    flexDirection: 'column',
};

export const OPTION_CONTAINER_BASE_STYLE: object = {
    width: '100%',
    height: '40px',
    borderBottom: '1px solid rgb(229, 229, 229)',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
};

export const COLOR_SELECTOR_CONTAINER_BASE_STYLE: object = {
    height: '100%',
    width: '0px',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '11px 13px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
};

export const COLOR_SELECTED_INDICATOR_BASE_STYLE = ({
    color,
}: {
    color: string;
}): object => ({
    height: '100%',
    aspectRatio: '1/1',
    backgroundColor: color,
    borderRadius: '50%',
    border: '1px solid black',
    display: 'inline-block',
});

export const COLOR_SELECTED_BASE_STYLE: object = {
    fontFamily: 'Arial serif',
    fontSize: '13px',
    marginLeft: '10px',
};

export const COLOR_SELECTOR_ARROW_BASE_STYLE: object = {
    height: '50%',
    marginLeft: 'auto',
};

export const PALATTE_CONTAINER_BASE_STYLE = ({
    colorContainerHeight,
    colorContainerWidth,
}: {
    colorContainerHeight: number;
    colorContainerWidth: number;
}): object => ({
    width: colorContainerWidth,
    height: 'fit-content',
    position: 'absolute',
    zIndex: '10',
    top: colorContainerHeight,
    right: '0px',
    boxSizing: 'border-box',
    padding: '15px',
    boxShadow: 'rgba(60, 64, 67, 0.15) 0px 2px 6px 0px',
    backgroundColor: 'rgb(255, 255, 255)',
});

export const SATURATION_BASE_STYLE: object = {
    width: '100%',
    aspectRatio: '1/1',
};

export const HUE_BASE_STYLE: object = {
    marginTop: '15px',
};

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
    top?: number;
    left?: number;
}): object => {
    return {
        position: 'absolute',
        zIndex: '10',
        top: top + 'px',
        left: left + 'px',
        width: 'fit-content',
        height: 'fit-content',
        backgroundColor: 'rgb(34, 34, 34)',
        color: 'rgb(255, 255, 255)',
        boxSizing: 'border-box',
        padding: '7px',
        fontFamily: 'Arial serif',
        fontSize: '12px',
        borderRadius: '3px',
    };
};

export const ICONS_CONTAINER_BASE_STYLE = (rowCount: number, colCount: number): object => ({
    width: '100%',
    height: '0px',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: `repeat(${colCount}, 1fr)`,
    gridTemplateRows: `repeat(${rowCount}, 1fr)`,
    columnGap: '0px',
    rowGap: '10px',
    overflowY: 'auto',
    overflowX: 'hidden',
});

export const ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE: object = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Arial serif',
    fontSize: '17px',
    textAlign: 'center',
    color: '#86888A',
};

export const getIconsContainerRowColCounts = (
    iconsContainerRef: RefObject<HTMLElement>,
    iconContainerStyle: { width?: string, height?: string }
): { rowCount: number; colCount: number } => {
    const iconsContainerComputedStyles = iconsContainerRef.current && window.getComputedStyle(iconsContainerRef.current);
    const containerWidth = iconsContainerRef.current?.clientWidth || 0;
    const containerHeight = iconsContainerRef.current?.clientHeight || 0;
    const containerPaddingLeft = parseInt(iconsContainerComputedStyles?.getPropertyValue('padding-left') || '0');
    const containerPaddingRight = parseInt(iconsContainerComputedStyles?.getPropertyValue('padding-right') || '0');
    const containerPaddingTop = parseInt(iconsContainerComputedStyles?.getPropertyValue('padding-top') || '0');
    const containerPaddingBottom = parseInt(iconsContainerComputedStyles?.getPropertyValue('padding-bottom') || '0');
    const containerColumnGap = parseInt(iconsContainerComputedStyles?.getPropertyValue('column-gap') || '0');
    const containerRowGap = parseInt(iconsContainerComputedStyles?.getPropertyValue('row-gap') || '0');
    const iconWidth = parseInt(iconContainerStyle.width || '0');
    const iconHeight = parseInt(iconContainerStyle.height || '0');
    const rowCount = Math.floor((containerHeight - containerPaddingBottom - containerPaddingTop - containerRowGap) / (iconHeight + containerRowGap));
    const colCount = Math.floor((containerWidth - containerPaddingLeft - containerPaddingRight - containerColumnGap) / (iconWidth + containerColumnGap));
    if(isNaN(rowCount) || isNaN(colCount)) return { rowCount: 0, colCount: 0 };
    return { rowCount, colCount };
};

export const ICON_PLACEHOLDER: object = {
    width: 'auto',
    aspectRatio: '1/1',
};

export const LOADING_CONTAINER_BASE_STYLE: object = {
    height: 'fit-content',
    gridColumn: '1/-1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
};

export const LOADING_BASE_STYLE: object = {
    height: '30px',
    width: '30px',
};

export const SEARCH_CONTAINER_BASE_STYLE: object = {
    width: '100%',
    height: '40px',
    borderBottom: '1px solid rgb(229, 229, 229)',
    boxSizing: 'border-box',
    padding: '11px 10px',
    display: 'flex',
    alignItems: 'center',
};

export const SEARCH_ICON_BASE_STYLE: object = {
    height: '100%',
    cursor: 'pointer',
    marginRight: '10px',
};

export const SEARCH_INPUT_BASE_STYLE: object = {
    flexGrow: '1',
    outline: 'none',
    border: '0',
    fontSize: '12px',
    fontFamily: 'Arial, serif',
};

export const TYPE_CONTAINER_BASE_STYLE: object = {
    height: '100%',
    width: '0px',
    flexGrow: '1',
    borderRight: '1px solid #E5E5E5',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '11px 13px',
    cursor: 'pointer',
};

export const TYPE_SELECTED_BASE_STYLE: object = {
    fontFamily: 'Arial, serif',
    fontSize: '12px',
};

export const TYPE_ARROW_BASE_STYLE: object = {
    height: '50%',
    cursor: 'pointer',
    marginLeft: 'auto',
};

export const TYPE_OPTIONS_CONTAINER_BASE_STYLE = ({
    height = 0,
    width = 0,
}: {
    height?: number;
    width?: number;
}): object => ({
    position: 'absolute',
    zIndex: '10',
    top: height,
    left: '0px',
    border: '1px solid black',
    width,
    height: 'fit-content',
    backgroundColor: 'rgb(34, 34, 34)',
    boxShadow: 'rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
});

export const TYPE_OPTION_BASE_STYLE: object = {
    width: '100%',
    height: '20px',
    margin: '5px 13px',
    fontFamily: 'Arial serif',
    fontSize: '12px',
    cursor: 'pointer',
    color: 'rgb(253, 253, 253)',
};
