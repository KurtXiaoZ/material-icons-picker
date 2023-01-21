import { IMaterialIconsPicker } from './types';
import { IconSearch } from '../IconSearch';
import { TypeSelector } from '../TypeSelector';
import { ColorSelector } from '../ColorSelector';
import { CONTAINER_BASE_STYLE, OPTION_CONTAINER_BASE_STYLE } from './styles';
import { useState } from 'react';
import { ICON_TYPES } from '../../lib/constants';
import 'material-icons/iconfont/material-icons.css';
import { Icons } from '../Icons';

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
        icon,
    } = styles;

    const [type, setType] = useState(ICON_TYPES[0]);
    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 0, a: 1 });
    const [iconSearch, setIconSearch] = useState('');

    return <div
        style={container ? container(CONTAINER_BASE_STYLE) : CONTAINER_BASE_STYLE}
    >
        <IconSearch 
            styles={{ searchContainer, searchIcon, searchInput }}
            setIconSearch={setIconSearch}
        />
        <div 
            style={optionContainer ? optionContainer(OPTION_CONTAINER_BASE_STYLE) : OPTION_CONTAINER_BASE_STYLE}
        >
            <TypeSelector
                styles={{ typeContainer, typeSelected, typeArrow, typeOptionsContainer, typeOption }}
                type={type}
                setType={setType}
            />
            <ColorSelector
                styles={{ colorSelectorContainer, colorSelectedIndicator, colorSelected, colorSelectorArrow, palatteContainer, saturation, hue }}
                hsva={hsva}
                setHsva={setHsva}
            />
        </div>
        <Icons
            styles={{ iconsContainer, icon }}
            iconSearch={iconSearch}
            type={type?.value}
            hsva={hsva}
        />
    </div>
};