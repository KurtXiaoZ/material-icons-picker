interface IStyles {
    iconsContainer?: (baseStyle: object) => object;
    iconContainer?: (baseStyle: object) => object;
    icon?: (baseStyle: object) => object;
    iconTip?: (baseStyle: object) => object;
    iconsContainerPlaceholder?: (baseStyle: object) => object;
    loadingContainer?: (baseStyle: object) => object;
    loading?: (baseStyle: object) => object;
}

export interface IIcons {
    styles?: IStyles;
    iconSearch: string;
    type: string;
    hsva: { h: number; s: number; v: number; a: number };
    hsvaProp?: { h: number; s: number; v: number; a: number };
    onIconsChange?: (icons: string[]) => void;
    onIconClick?: (icon: string) => void;
    onIconMouseEnter?: (icon: string) => void;
    showIconTip?: boolean;
    setIconTipText?: (icon: string) => string;
}
