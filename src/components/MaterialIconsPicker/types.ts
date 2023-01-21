interface IStyles {
    container?: (baseStyle: object) => object,
    optionContainer?: (baseStyle: object) => object,
    searchContainer?: (baseStyle: object) => object,
    searchIcon?: (baseStyle: object) => object,
    searchInput?: (baseStyle: object) => object,
    typeContainer?: (baseStyle: object) => object,
    typeSelected?: (baseStyle: object) => object,
    typeArrow?: (baseStyle: object) => object,
}

export interface IMaterialIconsPicker {
    styles?: IStyles,
}
