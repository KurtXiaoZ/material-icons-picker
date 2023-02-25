interface IStyles {
    typeContainer?: (baseStyle: object) => object;
    typeSelected?: (baseStyle: object) => object;
    typeArrow?: (baseStyle: object) => object;
    typeOptionsContainer?: (baseStyle: object) => object;
    typeOption?: (baseStyle: object) => object;
}

export interface ITypeSelector {
    styles?: IStyles;
    type: { label: string; value: string };
    typeProp?: { label: string; value: string };
    setType: (type: { label: string; value: string }) => void;
    onTypeChange?: (type: { label: string, value: string }) => void;
}
