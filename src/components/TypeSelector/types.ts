interface IStyles {
    typeContainer?: (baseStyle: object) => object,
    typeSelected?: (baseStyle: object) => object,
    typeArrow?: (baseStyle: object) => object,
    typeOptionsContainer?: (baseStyle: object) => object,
    typeOption?: (baseStyle: object) => object,
}

export interface ITypeSelector {
    styles?: IStyles
}