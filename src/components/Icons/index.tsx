import { MATERIAL_ICONS } from '../../assets/materialIcons';
import { TEXT } from '../../lib/constants';
import {
    ICONS_CONTAINER_BASE_STYLE,
    ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE,
} from './styles';
import { IIcons } from './types';
import { Icon } from '../Icon';
import { useElementSize } from '../../lib/hooks';
import { useState } from 'react';

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
        : MATERIAL_ICONS.slice(0, defaultIconsNumber);
    
    const [iconsContainerRef] = useElementSize();

    return (
        <div
            style={
                iconsContainer
                    ? iconsContainer(ICONS_CONTAINER_BASE_STYLE)
                    : ICONS_CONTAINER_BASE_STYLE
            }
            ref={iconsContainerRef}
            onScroll={(e: any) => setIconsContainerScrollTop(e.target.scrollTop)}
        >
            {iconSearchResults.length ? (
                iconSearchResults.map((icon: string) => (
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
