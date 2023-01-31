import { useRef } from 'react';
import SearchIcon from '../../assets/icons/search.svg';
import {
    SEARCH_CONTAINER_BASE_STYLE,
    SEARCH_ICON_BASE_STYLE,
    SEARCH_INPUT_BASE_STYLE,
} from '../../lib/styles';
import { IIconSearch } from './types';

export const IconSearch = (props: IIconSearch) => {
    const { styles = {}, setIconSearch } = props;

    const { searchContainer, searchIcon, searchInput } = styles;
    const searchInputRef = useRef<HTMLInputElement>(null);

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
                placeholder="Search"
                ref={searchInputRef}
                onKeyDown={e => e.key === 'Enter' && setIconSearch(searchInputRef.current.value)}
                data-testid='mip-searchInput'
            />
        </div>
    );
};
