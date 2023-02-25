import { IProps, IRefs } from './types';
import { IconSearch } from '../IconSearch';
import { TypeSelector } from '../TypeSelector';
import { ColorSelector } from '../ColorSelector';
import { CONTAINER_BASE_STYLE, OPTION_CONTAINER_BASE_STYLE } from '../../lib/styles';
import React, { useState } from 'react';
import { ICON_TYPES } from '../../lib/constants';
import 'material-icons/iconfont/material-icons.css';
import { Icons } from '../Icons';
import { useUpdate } from '../../lib/hooks';

export const MaterialIconsPicker = React.forwardRef((props: IProps, refs: IRefs) => {
    const {
        styles = {},
        onSearch,
        onSearchValueChange,
        searchValue,
        defaultSearchValue,
        onTypeChange,
    } = props || {};

    const {
        searchInputRef
    } = refs || {};

    const {
        container,
        optionContainer,
        searchContainer,
        searchIcon,
        searchInput,
        typeContainer,
        typeSelected,
        typeArrow,
        typeOptionsContainer,
        typeOption,
        colorSelectorContainer,
        colorSelectedIndicator,
        colorSelected,
        colorSelectorArrow,
        palatteContainer,
        saturation,
        hue,
        iconsContainer,
        iconContainer,
        icon,
        iconTip,
        iconsContainerPlaceholder,
        loadingContainer,
        loading,
    } = styles;

    const [type, setType] = useState<{ label: string, value: string }>(ICON_TYPES[0]);
    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 0, a: 1 });
    const [iconSearch, setIconSearch] = useState(searchValue || defaultSearchValue || '');

    useUpdate(() => typeof onSearch === 'function' && onSearch(iconSearch), [iconSearch]);
    useUpdate(() => typeof onTypeChange === 'function' && onTypeChange(type), [type]);

    return (
        <div
            data-testid='mip-container'
            style={
                container
                    ? container(CONTAINER_BASE_STYLE)
                    : CONTAINER_BASE_STYLE
            }
        >
            <IconSearch
                styles={{ searchContainer, searchIcon, searchInput }}
                setIconSearch={setIconSearch}
                onSearchValueChange={onSearchValueChange}
                searchValue={searchValue}
                defaultSearchValue={defaultSearchValue}
                ref={searchInputRef}
            />
            <div
                data-testid='mip-optionContainer'
                style={
                    optionContainer
                        ? optionContainer(OPTION_CONTAINER_BASE_STYLE)
                        : OPTION_CONTAINER_BASE_STYLE
                }
            >
                <TypeSelector
                    styles={{
                        typeContainer,
                        typeSelected,
                        typeArrow,
                        typeOptionsContainer,
                        typeOption,
                    }}
                    type={type}
                    setType={setType}
                />
                <ColorSelector
                    styles={{
                        colorSelectorContainer,
                        colorSelectedIndicator,
                        colorSelected,
                        colorSelectorArrow,
                        palatteContainer,
                        saturation,
                        hue,
                    }}
                    hsva={hsva}
                    setHsva={setHsva}
                />
            </div>
            <Icons
                styles={{
                    iconsContainer,
                    iconContainer,
                    icon,
                    iconTip,
                    iconsContainerPlaceholder,
                    loadingContainer,
                    loading
                }}
                iconSearch={iconSearch}
                type={type?.value}
                hsva={hsva}
            />
        </div>
    );
});
