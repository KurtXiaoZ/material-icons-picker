import { useRef, useState } from 'react';
import {
    COLOR_SELECTOR_CONTAINER_BASE_STYLE,
    COLOR_SELECTED_INDICATOR_BASE_STYLE,
    COLOR_SELECTED_BASE_STYLE,
    COLOR_SELECTOR_ARROW_BASE_STYLE,
    PALATTE_CONTAINER_BASE_STYLE,
    SATURATION_BASE_STYLE,
    HUE_BASE_STYLE,
} from './styles';
import { IColorSelector } from './types';
import ArrowDownIcon from '../../assets/icons/arrowDown.svg';
import { useElementSize, useEventOutside } from '../../lib/hooks';
import Hue from '@uiw/react-color-hue';
import Saturation from '@uiw/react-color-saturation';
import { hsvaToHex } from '@uiw/color-convert';

export const ColorSelector = (props: IColorSelector) => {
    const { styles = {}, hsva, setHsva } = props;

    const {
        colorSelectorContainer,
        colorSelectedIndicator,
        colorSelected,
        colorSelectorArrow,
        palatteContainer,
        saturation,
        hue,
    } = styles;

    const [
        colorSelectorContainerRef,
        { width: colorContainerWidth, height: colorContainerHeight },
    ] = useElementSize();
    const [showPaletteContainer, setShowPaletteContainer] = useState(false);
    const paletteContainerRef = useRef<HTMLDivElement | null>(null);
    useEventOutside(
        'mousedown',
        [colorSelectorContainerRef, paletteContainerRef],
        () => setShowPaletteContainer(false)
    );

    return (
        <div
            style={
                colorSelectorContainer
                    ? colorSelectorContainer(
                          COLOR_SELECTOR_CONTAINER_BASE_STYLE
                      )
                    : COLOR_SELECTOR_CONTAINER_BASE_STYLE
            }
            ref={colorSelectorContainerRef}
            onMouseDown={() => setShowPaletteContainer(true)}
        >
            <span
                style={
                    colorSelectedIndicator
                        ? colorSelectedIndicator(
                              COLOR_SELECTED_INDICATOR_BASE_STYLE({
                                  color: hsvaToHex(hsva),
                              })
                          )
                        : COLOR_SELECTED_INDICATOR_BASE_STYLE({
                              color: hsvaToHex(hsva),
                          })
                }
            ></span>
            <span
                style={
                    colorSelected
                        ? colorSelected(COLOR_SELECTED_BASE_STYLE)
                        : COLOR_SELECTED_BASE_STYLE
                }
            >
                {hsvaToHex(hsva)}
            </span>
            <img
                src={ArrowDownIcon}
                style={
                    colorSelectorArrow
                        ? colorSelectorArrow(COLOR_SELECTOR_ARROW_BASE_STYLE)
                        : COLOR_SELECTOR_ARROW_BASE_STYLE
                }
            />
            {showPaletteContainer && (
                <div
                    style={
                        palatteContainer
                            ? palatteContainer(
                                  PALATTE_CONTAINER_BASE_STYLE({
                                      colorContainerHeight,
                                      colorContainerWidth,
                                  })
                              )
                            : PALATTE_CONTAINER_BASE_STYLE({
                                  colorContainerHeight,
                                  colorContainerWidth,
                              })
                    }
                    ref={paletteContainerRef}
                >
                    <Saturation
                        hsva={hsva}
                        style={
                            saturation
                                ? saturation(SATURATION_BASE_STYLE)
                                : SATURATION_BASE_STYLE
                        }
                        onChange={(newColor) =>
                            setHsva({ ...hsva, ...newColor, a: hsva.a })
                        }
                    />
                    <Hue
                        hue={hsva.h}
                        style={hue ? hue(HUE_BASE_STYLE) : HUE_BASE_STYLE}
                        onChange={(newHue) => setHsva({ ...hsva, ...newHue })}
                    />
                </div>
            )}
        </div>
    );
};
