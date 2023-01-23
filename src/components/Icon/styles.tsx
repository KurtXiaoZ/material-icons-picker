import { hsvaToHex } from '@uiw/color-convert';

export const ICON_CONTAINER_BASE_STYLE: object = {
    position: 'relative',
    width: '30px',
    height: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2px',
};

export const ICON_BASE_STYLE = ({
    hsva,
}: {
    hsva: { h: number; s: number; v: number; a: number };
}): object => ({
    color: hsvaToHex(hsva),
    cursor: 'pointer',
});

export const ICON_TIP_BASE_STYLE = ({

}: {

}): object => ({
    position: 'absolute',
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: '#222222',
    color: '#FFFFFF',
    boxSizing: 'border-box',
    padding: '7px',
    fontFamily: 'Arial serif',
    fontSize: '12px',
    borderRadius: '3px',
});