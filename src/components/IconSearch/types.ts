interface IStyles {
    searchContainer?: (baseStyle: object) => object,
    searchIcon?: (baseStyle: object) => object,
    searchInput?: (baseStyle: object) => object,
}

export interface IIconSearch {
    styles?: IStyles,
    iconSearch: string,
    setIconSearch: (iconSearch: string) => void,
}