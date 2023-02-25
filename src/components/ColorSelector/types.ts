interface IStyles {
    colorSelectorContainer?: (baseStyle: object) => object;
    colorSelectedIndicator?: (baseStyle: object) => object;
    colorSelected?: (baseStyle: object) => object;
    colorSelectorArrow?: (baseStyle: object) => object;
    palatteContainer?: (baseStyle: object) => object;
    saturation?: (baseStyle: object) => object;
    hue?: (baseStyle: object) => object;
}

export interface IColorSelector {
    styles?: IStyles;
    hsva: { h: number; s: number; v: number; a: number };
    setHsva: (hsva: { h: number; s: number; v: number; a: number }) => void;
    onHsvaChange?: (hsva: { h: number; s: number; v: number; a: number }) => void;
    hsvaProp?: { h: number; s: number; v: number; a: number };
}
