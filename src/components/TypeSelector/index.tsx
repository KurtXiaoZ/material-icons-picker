import { ICON_TYPES } from '../../lib/constants';
import { TYPE_ARROW_BASE_STYLE, TYPE_CONTAINER_BASE_STYLE, TYPE_OPTION_BASE_STYLE, TYPE_SELECTED_BASE_STYLE, TYPE_OPTIONS_CONTAINER_BASE_STYLE } from './styles';
import { ITypeSelector } from './types';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import { useElementSize, useEventOutside } from '../../lib/hooks';
import { useRef, useState } from 'react';

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

    const typeOptionsContainerRef = useRef<HTMLDivElement>(null);
    const [typeContainerRef, { height: typeContainerHeight, width: typeContainerWidth }] = useElementSize();
    useEventOutside('click', [typeOptionsContainerRef, typeContainerRef], () => setShowOptions(false));
    const [showOptions, setShowOptions] = useState(false);
    const [selectedType, setSelectedType] = useState(ICON_TYPES[0])

    return <div 
        style={typeContainer ? typeContainer(TYPE_CONTAINER_BASE_STYLE) : TYPE_CONTAINER_BASE_STYLE}
        ref={typeContainerRef}
        onMouseDown={() => setShowOptions(true)}
    >
            <span
                style={typeSelected ? typeSelected(TYPE_SELECTED_BASE_STYLE) : TYPE_SELECTED_BASE_STYLE}
            >
                {selectedType.label}
            </span>
            <img
                src={ArrowDown}
                style={typeArrow ? typeArrow(TYPE_ARROW_BASE_STYLE) : TYPE_ARROW_BASE_STYLE}
            />
        {showOptions && <div
            style={typeOptionsContainer
                ? typeOptionsContainer(TYPE_OPTIONS_CONTAINER_BASE_STYLE({ height: typeContainerHeight, width: typeContainerWidth })) 
                : TYPE_OPTIONS_CONTAINER_BASE_STYLE({ height: typeContainerHeight, width: typeContainerWidth })}
            ref={typeOptionsContainerRef}
        >
            {ICON_TYPES?.map(({ label, value }) => <div
                style={typeOption ? typeOption(TYPE_OPTION_BASE_STYLE) : TYPE_OPTION_BASE_STYLE}
                onClick={() => {
                    setSelectedType({ label, value });
                    setShowOptions(false);
                }}
            >
                {label}
            </div>)}
        </div>}
    </div>;
};