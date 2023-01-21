import { IMaterialIconsPicker } from './types';
import { IconSearch } from '../IconSearch';
import { TypeSelector } from '../TypeSelector';
import { ColorSelector } from '../ColorSelector';
import { CONTAINER_BASE_STYLE, OPTION_CONTAINER_BASE_STYLE } from './styles';

export const MaterialIconsPicker = ({
    styles = {}
}: IMaterialIconsPicker) => {

    const {
        container,
        optionContainer,
        searchContainer,
        searchIcon,
        searchInput,
        typeContainer,
        typeSelected,
        typeArrow,
    } = styles;

    return <div
        style={container ? container(CONTAINER_BASE_STYLE) : CONTAINER_BASE_STYLE}
    >
        <IconSearch 
            styles={{ searchContainer, searchIcon, searchInput }}
        />
        <div 
            style={optionContainer ? optionContainer(OPTION_CONTAINER_BASE_STYLE) : OPTION_CONTAINER_BASE_STYLE}
        >
            <TypeSelector
                styles={{ typeContainer, typeSelected, typeArrow }}
            />
            <ColorSelector />
        </div>
    </div>
};