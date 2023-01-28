export const ICONS_CONTAINER_BASE_STYLE: object = {
    width: '100%',
    height: '0',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '20px',
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // columnGap: '0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 30px)',
    gridTemplateRows: 'repeat(auto-fill, 30px)',
    columnGap: '10px',
    rowGap: '10px',
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
    let marginTop = 0, marginRight = 0, marginBottom = 0, marginLeft = 0;
    Object.entries(iconContainerStyle).forEach((entry: any) => {
        const [key, val] = entry;
        if(key === 'marginTop') marginTop = parseInt(val);
        else if(key === 'marginRight') marginRight = parseInt(val);
        else if(key === 'marginBottom') marginBottom = parseInt(val);
        else if(key === 'marginLeft') marginLeft = parseInt(val);
        else if(key === 'margin') {
            const marginArr = val.split(' ');
        }
    });




    const iconsContainerComputedStyles =
        iconsContainerRef.current &&
        window.getComputedStyle(iconsContainerRef.current);

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