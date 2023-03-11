import React from 'react';

interface IStyles {
    iconsContainer?: (baseStyle: object) => object;
    iconContainer?: (baseStyle: object) => object;
    icon?: (baseStyle: object) => object;
    iconTip?: (baseStyle: object) => object;
    iconsContainerPlaceholder?: (baseStyle: object) => object;
}

export interface IIcon {
    styles?: IStyles;
    icon: string;
    type: string;
    hsva: { h: number; s: number; v: number; a: number };
    ref: React.Ref<HTMLElement>;
    iconsContainerScrollTop: number,
    onIconClick?: (icon: string) => void;
    onIconMouseEnter?: (icon: string) => void;
}
