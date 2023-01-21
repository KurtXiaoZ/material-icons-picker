export const COLOR_SELECTOR_CONTAINER_BASE_STYLE: object = {
    height: '100%',
    width: '0',
    flexGrow: '1',
    boxSizing: 'border-box',
    padding: '11px 13px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
}

export const COLOR_SELECTED_INDICATOR_BASE_STYLE = ({ color }: { color: string }): object => ({
    height: '100%',
    aspectRatio : '1/1',
    backgroundColor: color,
    borderRadius: '50%',
    border: '1px solid black',
    display: 'inline-block',
});

export const COLOR_SELECTED_BASE_STYLE: object = {
    fontFamily: 'Arial serif',
    fontSize: '13px',
    marginLeft: '10px',
};

export const COLOR_SELECTOR_ARROW_BASE_STYLE: object = {
    height: '50%',
    marginLeft: 'auto',
};

export const PALATTE_CONTAINER_BASE_STYLE = ({ colorContainerHeight, colorContainerWidth }: { colorContainerHeight: number, colorContainerWidth: number }): object => ({
    width: colorContainerWidth,
    height: 'fit-content',
    position: 'absolute',
    top: colorContainerHeight,
    right : '0',
    boxSizing: 'border-box',
    padding: '15px',
    boxShadow: 'rgba(60, 64, 67, 0.15) 0px 2px 6px 0px',
});

export const SATURATION_BASE_STYLE: object = {
    width: '100%',
    aspectRatio : '1/1',
};

export const HUE_BASE_STYLE: object = {
    marginTop: '15px',
};