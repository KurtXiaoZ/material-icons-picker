export const ICONS_CONTAINER_BASE_STYLE: object = {
    /*overflowY: 'auto',
    overflowX: 'visible',
    width: '100%',
    height: '0',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 30px)',
    gridTemplateRows: 'repeat(auto-fill, 30px)',
    rowGap: '10px',
    columnGap: '10px',
    position: 'relative',
    margin: '0',*/
    width: '100%',
    height: '0',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: '10px',
    flexDirection: 'row',
    columnGap: '0',
    overflowY: 'auto',
    overflowX: 'hidden',
};

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
    const iconsContainerComputedStyles =
        iconsContainerRef.current &&
        window.getComputedStyle(iconsContainerRef.current);

    console.log(iconsContainerRef.current?.style.columnCount)
    const iconsContainerRowGap = parseInt(iconsContainerComputedStyles?.getPropertyValue('row-gap'));
    const iconsContainerColGap = parseInt(iconsContainerComputedStyles?.getPropertyValue('column-gap'));
    const iconsContainerHeight = parseInt(iconsContainerComputedStyles?.getPropertyValue('height'));
    const iconsContainerWidth = parseInt(iconsContainerComputedStyles?.getPropertyValue('width'));
    const iconsContainerPaddingTop = parseInt(iconsContainerComputedStyles?.getPropertyValue('padding-top'));
    const iconsContainerPaddingRight = parseInt(iconsContainerComputedStyles?.getPropertyValue('padding-right'));
    const iconsContainerPaddingBottom = parseInt(iconsContainerComputedStyles?.getPropertyValue('padding-bottom'));
    const iconsContainerPaddingLeft = parseInt(iconsContainerComputedStyles?.getPropertyValue('padding-left'));
    const iconContainerHeight = parseInt(iconContainerStyle?.height);
    const iconContainerWidth = parseInt(iconContainerStyle?.width);
    return {
        rowCount:
            (Math.round(
                (iconsContainerHeight -
                    iconsContainerPaddingTop -
                    iconsContainerPaddingBottom -
                    iconContainerHeight) /
                    (iconContainerHeight + iconsContainerRowGap)
            ) || 0) + 1,
        colCount:
            (Math.round(
                (iconsContainerWidth -
                    iconsContainerPaddingLeft - 
                    iconsContainerPaddingRight - 
                    iconContainerWidth) /
                    (iconContainerWidth + iconsContainerColGap)
            ) || 0) + 1,
    };
};