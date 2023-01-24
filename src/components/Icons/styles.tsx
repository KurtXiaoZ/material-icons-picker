export const ICONS_CONTAINER_BASE_STYLE: object = {
    width: '100%',
    height: '0',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 30px)',
    gridTemplateRows: 'repeat(auto-fill, 30px)',
    columnGap: '10px',
    rowGap: '10px',
    position: 'relative',
    overflowY: 'auto',
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
    const iconsContainerRowGap = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('row-gap')
    );
    const iconsContainerColGap = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('column-gap')
    );
    const iconsContainerHeight = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('height')
    );
    const iconsContainerWidth = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('width')
    );
    const iconsContainerPaddingTop = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('padding-top')
    );
    const iconsContainerPaddingLeft = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('padding-left')
    );
    const iconsContainerPaddingRight = parseInt(
        iconsContainerComputedStyles?.getPropertyValue('padding-right')
    );
    const iconContainerHeight = parseInt(iconContainerStyle?.height);
    const iconContainerWidth = parseInt(iconContainerStyle?.width);
    return {
        rowCount:
            (Math.floor(
                (iconsContainerHeight -
                    iconsContainerPaddingTop -
                    iconContainerHeight) /
                    (iconContainerHeight + iconsContainerRowGap)
            ) || 0) + 1,
        colCount:
            (Math.floor(
                (iconsContainerWidth -
                    iconsContainerPaddingLeft -
                    iconsContainerPaddingRight -
                    iconContainerWidth) /
                    (iconContainerWidth + iconsContainerColGap)
            ) || 0) + 1,
    };
};
