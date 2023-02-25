import React, { useRef } from 'react';
import SearchIcon from '../../assets/icons/search.svg';
import {
    SEARCH_CONTAINER_BASE_STYLE,
    SEARCH_ICON_BASE_STYLE,
    SEARCH_INPUT_BASE_STYLE,
} from '../../lib/styles';
import { IIconSearch } from './types';

export const IconSearch = React.forwardRef((props: IIconSearch, propSearchInputRef: React.Ref<HTMLInputElement>) => {
    const { styles = {}, setIconSearch, onSearchValueChange, searchValue, defaultSearchValue } = props;

    const { searchContainer, searchIcon, searchInput } = styles;
    const inComponentSearchInputRef = useRef<HTMLInputElement>(null);
    const searchInputRef = propSearchInputRef || inComponentSearchInputRef;

    return (
        <div
            style={
                searchContainer
                    ? searchContainer(SEARCH_CONTAINER_BASE_STYLE)
                    : SEARCH_CONTAINER_BASE_STYLE
            }
            data-testid='mip-searchContainer'
        >
            <img
                src={SearchIcon}
                style={
                    searchIcon
                        ? searchIcon(SEARCH_ICON_BASE_STYLE)
                        : SEARCH_ICON_BASE_STYLE
                }
                onClick={() => setIconSearch(searchInputRef.current.value)}
                data-testid='mip-searchIcon'
            />
            <input
                style={
                    searchInput
                        ? searchInput(SEARCH_INPUT_BASE_STYLE)
                        : SEARCH_INPUT_BASE_STYLE
                }
                value={searchValue}
                defaultValue={defaultSearchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => typeof onSearchValueChange === 'function' && onSearchValueChange(e.target.value)}
                placeholder="Search"
                ref={searchInputRef}
                onKeyDown={(e: KeyboardEvent) => e.key === 'Enter' && setIconSearch(searchInputRef.current.value)}
                data-testid='mip-searchInput'
            />
        </div>
    );
});
