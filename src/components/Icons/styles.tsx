import { hsvaToHex } from '@uiw/color-convert';

export const ICONS_CONTAINER_BASE_STYLE: object = {
    width: '100%',
    height: '0',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 30px)',
    gridTemplateRows: 'repeat(auto-fill, 30px)',
    columnGap: '10px',
    rowGap: '10px',
    position: 'relative',
    overflowY: 'auto',
};

export const ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE: object = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: 'Arial serif',
    fontSize: '17px',
    textAlign: 'center',
    color: '#86888A',
};
