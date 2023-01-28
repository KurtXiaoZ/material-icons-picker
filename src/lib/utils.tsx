import { MATERIAL_ICONS } from '../assets/materialIcons';

export const searchMaterialIcons = (searchValue: string): any =>
    searchValue ? MATERIAL_ICONS.filter((s) => s.toLowerCase().includes(searchValue)) : MATERIAL_ICONS;

export const xxx = (
    iconsContainerRef: any,
    iconContainerStyle: any
): { rowCount: number; colCount: number } => {
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
    let iconContainerMarginTop = 0;
    let iconContainerMarginRight = 0;
    let iconContainerMarginBottom = 0;
    let iconContainerMarginLeft = 0;

    Object.entries(iconContainerStyle).forEach((entry: any) => {
        const [key, val] = entry;
        if(key === 'marginLeft') iconContainerMarginLeft = parseInt(val);
        else if(key === 'marginTop') iconContainerMarginTop = parseInt(val);
        else if(key === 'marginRight') iconContainerMarginRight = parseInt(val);
        else if(key === 'marginBottom') iconContainerMarginBottom = parseInt(val);
        else if(key === 'margin') {
            const marginArray = val.split(' ');
        }
    });

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