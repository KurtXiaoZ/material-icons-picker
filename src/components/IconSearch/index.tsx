import SearchIcon from '../../assets/icons/search.svg';
import { SEARCH_CONTAINER_BASE_STYLE, SEARCH_ICON_BASE_STYLE, SEARCH_INPUT_BASE_STYLE } from './styles';
import { IIconSearch } from './types';

export const IconSearch = (props: IIconSearch) => {
    const {
        styles = {}
    } = props;

    const { searchContainer, searchIcon, searchInput } = styles;

    return <div 
        style={searchContainer ? searchContainer(SEARCH_CONTAINER_BASE_STYLE) : SEARCH_CONTAINER_BASE_STYLE}
    >
        <img
            src={SearchIcon}
            style={searchIcon ? searchIcon(SEARCH_ICON_BASE_STYLE) : SEARCH_ICON_BASE_STYLE}
        />
        <input 
            style={searchInput? searchInput(SEARCH_INPUT_BASE_STYLE) : SEARCH_INPUT_BASE_STYLE}
            placeholder='Search'
        />
    </div>
};