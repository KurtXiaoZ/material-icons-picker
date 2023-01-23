interface IStyles {
    iconsContainer?: (baseStyle: object) => object,
    icon?: (baseStyle: object) => object,
    iconsContainerPlaceholder?: (baseStyle: object) => object,
}

export interface IIcon {
    styles?: IStyles,
    iconSearch: string,
    type: string,
    hsva: { h: number, s: number, v: number, a: number },
}