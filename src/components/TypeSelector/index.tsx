import { ICON_TYPES } from '../../lib/constants';
import { TYPE_ARROW_BASE_STYLE, TYPE_CONTAINER_BASE_STYLE, TYPE_OPTION_BASE_STYLE, TYPE_SELECTED_BASE_STYLE, TYPE_OPTIONS_CONTAINER_BASE_STYLE } from './styles';
import { ITypeSelector } from './types';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import { useRef } from 'react';
import { useElementSize } from '../../lib/hooks';

export const TypeSelector = (props: ITypeSelector = {}) => {
    const {
        styles = {}
    } = props;

    const {
        typeContainer,
        typeSelected,
        typeArrow,
        typeOptionsContainer,
        typeOption
    } = styles;

    const [typeContainerRef, { height: typeContainerHeight, width: typeContainerWidth }] = useElementSize();

    return <div 
        style={typeContainer ? typeContainer(TYPE_CONTAINER_BASE_STYLE) : TYPE_CONTAINER_BASE_STYLE}
        ref={typeContainerRef}
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
        <div
            style={typeOptionsContainer
                ? typeOptionsContainer(TYPE_OPTIONS_CONTAINER_BASE_STYLE({ height: typeContainerHeight, width: typeContainerWidth })) 
                : TYPE_OPTIONS_CONTAINER_BASE_STYLE({ height: typeContainerHeight, width: typeContainerWidth })}
        >
            {ICON_TYPES?.map(({ label, value }) => <div
                style={typeOption ? typeOption(TYPE_OPTION_BASE_STYLE) : TYPE_OPTION_BASE_STYLE}
            >
                {label}
            </div>)}
        </div>
    </div>
};