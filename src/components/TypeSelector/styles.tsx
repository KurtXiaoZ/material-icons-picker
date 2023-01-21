export const TYPE_CONTAINER_BASE_STYLE: object = {
    height: '100%',
    width: '0',
    flexGrow: '1',
    borderRight: '1px solid #E5E5E5',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '11px 13px',
    cursor: 'pointer',
};

export const TYPE_SELECTED_BASE_STYLE: object = {
    fontFamily: 'Arial, serif',
    fontSize: '12px',

};

export const TYPE_ARROW_BASE_STYLE: object = {
    height: '50%',
    cursor: 'pointer',
    marginLeft: 'auto'
};

export const TYPE_OPTIONS_CONTAINER_BASE_STYLE = ({ height = 0, width = 0 }: { height?: number, width?: number }): object => ({
    position: 'absolute',
    top: height,
    left: '0',
    border: '1px solid black',
    width,
    height: 'fit-content',
    backgroundColor: '#222222',
    boxShadow: '0px 2px 6px 2px rgba(60, 64, 67, 0.15)'
});

export const TYPE_OPTION_BASE_STYLE: object = {
    width: '100%',
    height: '20px',
    margin: '5px 13px',
    fontFamily: 'Arial serif',
    fontSize: '12px',
    cursor: 'pointer',
    color: '#FDFDFD',
};