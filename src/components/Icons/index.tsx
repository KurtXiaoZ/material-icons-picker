import { useEffect, useState, useRef } from "react";
import { MATERIAL_ICONS } from "../../assets/materialIcons";
import { ICON_TYPES, TEXT } from "../../lib/constants";
import { useLazyLoad } from "../../lib/hooks";
import { ICONS_CONTAINER_BASE_STYLE, ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE, ICON_BASE_STYLE } from "./styles";
import { IIcon } from "./types";


export const Icons = (props: IIcon) => {
    const {
        styles = {},
        iconSearch,
        type,
        hsva
    } = props;

    const {
        iconsContainer,
        icon: iconStyle,
        iconsContainerPlaceholder,
    } = styles;

    const iconSearchResults = iconSearch ? MATERIAL_ICONS.filter(s => s.toLowerCase().includes(iconSearch.toLowerCase())) : MATERIAL_ICONS;
    // useLazyLoad('data-lazyloadiconscontainer', 'data-lazyloadicon');

    return <div
        style={iconsContainer ? iconsContainer(ICONS_CONTAINER_BASE_STYLE) : ICONS_CONTAINER_BASE_STYLE}
        data-lazyloadiconscontainer
    >
        {iconSearchResults.length 
            ? iconSearchResults.map((icon: string) => <span
                className={`material-icons${type === ICON_TYPES[0].value ? '' : '-' + type }`}
                style={iconStyle
                    ? iconStyle(ICON_BASE_STYLE({ hsva }))
                    : ICON_BASE_STYLE({ hsva })
                }
                data-lazyloadicon
            >
                {icon}
            </span>)
            : <div
                style={iconsContainerPlaceholder ? iconsContainerPlaceholder(ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE) : ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE}
            >
                {TEXT.NO_ICON_FOUND}
            </div>
        }
    </div>
};