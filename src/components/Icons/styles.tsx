export const ICONS_CONTAINER_BASE_STYLE = (rowCount: number, colCount: number): object => ({
    width: '100%',
    height: '0',
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
    iconsContainerRef: any,
    iconContainerStyle: any
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