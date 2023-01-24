import { MATERIAL_ICONS } from '../../assets/materialIcons';
import { TEXT } from '../../lib/constants';
import {
    getIconsContainerRowColCounts,
    ICONS_CONTAINER_BASE_STYLE,
    ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE,
} from './styles';
import { IIcons } from './types';
import { Icon } from '../Icon';
import { useElementSize } from '../../lib/hooks';
import { useEffect, useState } from 'react';
import { ICON_CONTAINER_BASE_STYLE } from '../Icon/styles';

export const Icons = (props: IIcons) => {
    const { styles = {}, iconSearch, type, hsva, defaultIconsNumber } = props;

    const {
        iconsContainer,
        iconContainer,
        icon: iconStyle,
        iconTip,
        iconsContainerPlaceholder,
    } = styles;

    const [iconsContainerScrollTop, setIconsContainerScrollTop] = useState(0);
    const iconSearchResults = iconSearch
        ? MATERIAL_ICONS.filter((s) =>
              s.toLowerCase().includes(iconSearch.toLowerCase())
          )
        : MATERIAL_ICONS;
    
    const [iconsContainerRef] = useElementSize();
    const { rowCount, colCount } = getIconsContainerRowColCounts(iconsContainerRef, iconContainer ? iconContainer(ICON_CONTAINER_BASE_STYLE) : ICON_CONTAINER_BASE_STYLE);
    const [icons, setIcons] = useState<any>(iconSearchResults?.slice(0, rowCount * colCount) || []);
    
    useEffect(() => {
        setIcons(iconSearchResults?.slice(0, rowCount * colCount) || []);
    }, [rowCount, colCount]);

    return (
        <div
            style={
                iconsContainer
                    ? iconsContainer(ICONS_CONTAINER_BASE_STYLE)
                    : ICONS_CONTAINER_BASE_STYLE
            }
            ref={iconsContainerRef}
            onScroll={(e: any) => {
                if(e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight && icons.length < iconSearchResults.length) {
                    setTimeout(() => setIcons([ ...icons, ...iconSearchResults.slice(icons.length, icons.length + 3 * colCount)]), 500);
                }
                setIconsContainerScrollTop(e.target.scrollTop);
            }}
        >
            {icons.length ? (
                icons.map((icon: string) => (
                    <Icon
                        styles={{ iconContainer, icon: iconStyle, iconTip }}
                        icon={icon}
                        type={type}
                        hsva={hsva}
                        ref={iconsContainerRef}
                        iconsContainerScrollTop={iconsContainerScrollTop}
                    />
                ))
            ) : (
                <div
                    style={
                        iconsContainerPlaceholder
                            ? iconsContainerPlaceholder(
                                  ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE
                              )
                            : ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE
                    }
                >
                    {TEXT.NO_ICON_FOUND}
                </div>
            )}
        </div>
    );
};
