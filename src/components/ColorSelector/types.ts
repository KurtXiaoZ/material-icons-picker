interface IStyles {
    colorSelectorContainer?: (baseStyle: object) => object,
    colorSelectedIndicator?: (baseStyle: object) => object,
    colorSelected?: (baseStyle: object) => object,
    colorSelectorArrow?: (baseStyle: object) => object,
    palatteContainer?: (baseStyle: object) => object,
    saturation?: (baseStyle: object) => object,
    hue?: (baseStyle: object) => object,
}

export interface IColorSelector {
    styles?: IStyles
}