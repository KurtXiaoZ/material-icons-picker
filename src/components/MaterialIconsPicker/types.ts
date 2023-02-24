interface IStyles {
    container?: (baseStyle: object) => object;
    searchContainer?: (baseStyle: object) => object;
    searchIcon?: (baseStyle: object) => object;
    searchInput?: (baseStyle: object) => object;
    optionContainer?: (baseStyle: object) => object;
    typeContainer?: (baseStyle: object) => object;
    typeSelected?: (baseStyle: object) => object;
    typeArrow?: (baseStyle: object) => object;
    typeOptionsContainer?: (baseStyle: object) => object;
    typeOption?: (baseStyle: object) => object;
    colorSelectorContainer?: (baseStyle: object) => object;
    colorSelectedIndicator?: (baseStyle: object) => object;
    colorSelected?: (baseStyle: object) => object;
    colorSelectorArrow?: (baseStyle: object) => object;
    palatteContainer?: (baseStyle: object) => object;
    saturation?: (baseStyle: object) => object;
    hue?: (baseStyle: object) => object;
    iconsContainer?: (baseStyle: object) => object;
    iconContainer?: (baseStyle: object) => object;
    icon?: (baseStyle: object) => object;
    iconTip?: (baseStyle: object) => object;
    loadingContainer?: (baseStyle: object) => object;
    loading?: (baseStyle: object) => object;
    iconsContainerPlaceholder?: (baseStyle: object) => object;
}

export interface IMaterialIconsPicker {
    styles?: IStyles;
    onSearch?: (searchValue: string) => void;
    onSearchValueChange?: (searchValue: string) => void;
    searchValue?: string;
    defaultSearchValue?: string;
}
