export const ICONS_CONTAINER_BASE_STYLE: object = {
    width: '100%',
    height: '0',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
};

export const ICONS_GRID_BASE_STYLE: object = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 30px)',
    gridTemplateRows: 'repeat(auto-fill, 30px)',
    columnGap: '10px',
    rowGap: '10px',
    position: 'relative',
    overflowY: 'visible',
    overflowX: 'hidden',
    width: '100%',
    height: '0',
    flexGrow: '1',
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

export const LOADING_CONTAINER_BASE_STYLE: object = {
    // marginTop: '10px',
    width: '100%',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

export const LOADING_BASE_STYLE = (
    iconsGridRef: any,
    iconsGridScrollTop: number
): object => ({
    height: '100%',
    aspectRatio: '1/1',
});

export const getIconsContainerRowColCounts = (
    iconsGridRef: any,
    iconContainerStyle: any
): { rowCount: number; colCount: number } => {
    const iconsGridComputedStyles =
        iconsGridRef.current &&
        window.getComputedStyle(iconsGridRef.current);
    const iconsContainerRowGap = parseInt(
        iconsGridComputedStyles?.getPropertyValue('row-gap')
    );
    const iconsContainerColGap = parseInt(
        iconsGridComputedStyles?.getPropertyValue('column-gap')
    );
    const iconsContainerHeight = parseInt(
        iconsGridComputedStyles?.getPropertyValue('height')
    );
    const iconsContainerWidth = parseInt(
        iconsGridComputedStyles?.getPropertyValue('width')
    );
    const iconContainerHeight = parseInt(iconContainerStyle?.height);
    const iconContainerWidth = parseInt(iconContainerStyle?.width);
    return {
        rowCount:
            (Math.round(
                (iconsContainerHeight -
                    iconContainerHeight) /
                    (iconContainerHeight + iconsContainerRowGap)
            ) || 0) + 1,
        colCount:
            (Math.round(
                (iconsContainerWidth -
                    iconContainerWidth) /
                    (iconContainerWidth + iconsContainerColGap)
            ) || 0) + 1,
    };
};