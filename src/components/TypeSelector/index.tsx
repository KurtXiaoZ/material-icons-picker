import { ICON_TYPES } from '../../lib/constants';
import {
    TYPE_ARROW_BASE_STYLE,
    TYPE_CONTAINER_BASE_STYLE,
    TYPE_OPTION_BASE_STYLE,
    TYPE_SELECTED_BASE_STYLE,
    TYPE_OPTIONS_CONTAINER_BASE_STYLE,
} from '../../lib/styles';
import { ITypeSelector } from './types';
import ArrowDown from '../../assets/icons/arrowDown.svg';
import { useElementSize, useEventOutside } from '../../lib/hooks';
import { useRef, useState } from 'react';

export const TypeSelector = (props: ITypeSelector) => {
    const { styles = {}, type, typeProp, setType, onTypeChange, onTypeOptionClick } = props;

    const {
        typeContainer,
        typeSelected,
        typeArrow,
        typeOptionsContainer,
        typeOption,
    } = styles;

    const typeOptionsContainerRef = useRef<HTMLDivElement>(null);
    const [
        typeContainerRef,
        { height: typeContainerHeight, width: typeContainerWidth },
    ] = useElementSize<HTMLDivElement>();
    useEventOutside('click', [typeOptionsContainerRef, typeContainerRef], () =>
        setShowOptions(false)
    );
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div
            style={
                typeContainer
                    ? typeContainer(TYPE_CONTAINER_BASE_STYLE)
                    : TYPE_CONTAINER_BASE_STYLE
            }
            ref={typeContainerRef}
            onMouseDown={() => setShowOptions(true)}
            data-testid='mip-typeContainer'
        >
            <span
                style={
                    typeSelected
                        ? typeSelected(TYPE_SELECTED_BASE_STYLE)
                        : TYPE_SELECTED_BASE_STYLE
                }
                data-testid='mip-typeSelected'
            >
                {type.label}
            </span>
            <img
                src={ArrowDown}
                style={
                    typeArrow
                        ? typeArrow(TYPE_ARROW_BASE_STYLE)
                        : TYPE_ARROW_BASE_STYLE
                }
                data-testid='mip-typeArrow'
            />
            {showOptions && (
                <div
                    style={
                        typeOptionsContainer
                            ? typeOptionsContainer(
                                  TYPE_OPTIONS_CONTAINER_BASE_STYLE({
                                      height: typeContainerHeight,
                                      width: typeContainerWidth,
                                  })
                              )
                            : TYPE_OPTIONS_CONTAINER_BASE_STYLE({
                                  height: typeContainerHeight,
                                  width: typeContainerWidth,
                              })
                    }
                    ref={typeOptionsContainerRef}
                    data-testid='mip-typeOptionsContainer'
                >
                    {ICON_TYPES?.map(({ label, value }) => (
                        <div
                            style={
                                typeOption
                                    ? typeOption(TYPE_OPTION_BASE_STYLE)
                                    : TYPE_OPTION_BASE_STYLE
                            }
                            onClick={() => {
                                typeof onTypeOptionClick === 'function' && onTypeOptionClick({ label, value });
                                if(type.value !== value) {
                                    typeof onTypeChange === 'function' && onTypeChange({ label, value });
                                    !typeProp && setType({ label, value });
                                }
                                setShowOptions(false);
                            }}
                            data-testid='mip-typeOption'
                        >
                            {label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
