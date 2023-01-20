import { ICON_TYPES } from '../../lib/constants';
import { TYPE_ARROW_BASE_STYLE, TYPE_CONTAINER_BASE_STYLE, TYPE_SELECTED_BASE_STYLE } from './styles';
import { ITypeSelector } from './types';
import ArrowDown from '../../assets/icons/arrowDown.svg';

export const TypeSelector = (props: ITypeSelector = {}) => {
    const {
        styles = {}
    } = props;

    const {
        typeContainer,
        typeSelected,
        typeArrow,
    } = styles;

    return <div 
        style={typeContainer ? typeContainer(TYPE_CONTAINER_BASE_STYLE) : TYPE_CONTAINER_BASE_STYLE}
    >
            <span
                style={typeSelected ? typeSelected(TYPE_SELECTED_BASE_STYLE) : TYPE_SELECTED_BASE_STYLE}
            >
                {ICON_TYPES[0].label}
            </span>
            <img
                src={ArrowDown}
                style={typeArrow ? typeArrow(TYPE_ARROW_BASE_STYLE) : TYPE_ARROW_BASE_STYLE}
            />
        <div></div>
    </div>
};