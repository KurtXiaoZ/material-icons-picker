interface IStyles {
    iconsContainer?: (baseStyle: object) => object;
    iconContainer?: (baseStyle: object) => object;
    icon?: (baseStyle: object) => object;
    iconTip?: (baseStyle: object) => object;
    iconsContainerPlaceholder?: (baseStyle: object) => object;
    loading?: (baseStyle: object) => object;
}

export interface IIcons {
    styles?: IStyles;
    iconSearch: string;
    type: string;
    hsva: { h: number; s: number; v: number; a: number };
    defaultIconsNumber: number;
}
