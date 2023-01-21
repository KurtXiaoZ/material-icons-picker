import { COLOR_SELECTOR_CONTAINER_BASE_STYLE } from "./styles";
import { IColorSelector } from "./types";

export const ColorSelector = (props: IColorSelector = {}) => {
    const {
        styles = {}
    } = props;

    const {
        colorSelectorContainer
    } = styles;

    return <div
        style={colorSelectorContainer ? colorSelectorContainer(COLOR_SELECTOR_CONTAINER_BASE_STYLE) : COLOR_SELECTOR_CONTAINER_BASE_STYLE}
    ></div>
};