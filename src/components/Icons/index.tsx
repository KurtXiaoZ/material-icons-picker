import { MATERIAL_ICONS } from '../../assets/materialIcons';
import { TEXT } from '../../lib/constants';
import {
    ICONS_CONTAINER_BASE_STYLE,
    ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE,
} from './styles';
import { IIcons } from './types';
import { Icon } from '../Icon';

export const Icons = (props: IIcons) => {
    const { styles = {}, iconSearch, type, hsva, defaultIconsNumber } = props;

    const {
        iconsContainer,
        iconContainer,
        icon: iconStyle,
        iconTip,
        iconsContainerPlaceholder,
    } = styles;

    const iconSearchResults = iconSearch
        ? MATERIAL_ICONS.filter((s) =>
              s.toLowerCase().includes(iconSearch.toLowerCase())
          )
        : MATERIAL_ICONS.slice(0, defaultIconsNumber);

    return (
        <div
            style={
                iconsContainer
                    ? iconsContainer(ICONS_CONTAINER_BASE_STYLE)
                    : ICONS_CONTAINER_BASE_STYLE
            }
        >
            {iconSearchResults.length ? (
                iconSearchResults.map((icon: string) => (
                    <Icon
                        styles={{ iconContainer, icon: iconStyle, iconTip }}
                        icon={icon}
                        type={type}
                        hsva={hsva}
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
