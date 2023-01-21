import { useRef, useState } from "react";
import { MATERIAL_ICONS } from "../../assets/materialIcons";
import { ICON_TYPES } from "../../lib/constants";
import { ICONS_CONTAINER_BASE_STYLE, ICON_BASE_STYLE } from "./styles";
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
    } = styles;

    return <div
        style={iconsContainer ? iconsContainer(ICONS_CONTAINER_BASE_STYLE) : ICONS_CONTAINER_BASE_STYLE}
    >
        {iconSearch && MATERIAL_ICONS.filter(s => s.toLowerCase().includes(iconSearch)).map((icon: string) => <span
            className={`material-icons${type === ICON_TYPES[0].value ? '' : '-' + type }`}
            style={iconStyle
                ? iconStyle(ICON_BASE_STYLE({ hsva }))
                : ICON_BASE_STYLE({ hsva })
            }
        >
            {icon}
        </span>)}
    </div>
};