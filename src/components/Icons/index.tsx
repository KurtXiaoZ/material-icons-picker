import { MATERIAL_ICONS } from '../../assets/materialIcons';
import { DEFAULT_ROW_ADDITION_NUMBER, TEXT } from '../../lib/constants';
import {
    getIconsContainerRowColCounts,
    ICONS_CONTAINER_BASE_STYLE,
    ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE,
    LOADING_BASE_STYLE,
    LOADING_CONTAINER_BASE_STYLE,
    ICON_CONTAINER_BASE_STYLE
} from '../../lib/styles';
import { IIcons } from './types';
import { Icon } from '../Icon';
import { useElementSize, useDebounce, useUpdate, useThrottle } from '../../lib/hooks';
import { useEffect, useState, UIEvent } from 'react';
import LoadingIcon from '../../assets/icons/loading.svg';
import cssStyles from './styles.module.css';

export const Icons = (props: IIcons) => {
    const { 
        styles = {},
        iconSearch,
        type,
        hsva,
        hsvaProp,
        onIconsChange,
        onIconClick,
        onIconMouseEnter,
        showIconTip,
        setIconTipText
    } = props;

    const {
        iconsContainer,
        iconContainer,
        icon: iconStyle,
        iconTip,
        iconsContainerPlaceholder,
        loadingContainer,
        loading: loadingStyle,
    } = styles;

    const iconSearchResults = iconSearch ? MATERIAL_ICONS.filter((s) => s.toLowerCase().includes(iconSearch.toLowerCase())): MATERIAL_ICONS;
    const [iconsContainerRef] = useElementSize<HTMLDivElement>();
    const { rowCount, colCount } = getIconsContainerRowColCounts(iconsContainerRef, iconContainer ? iconContainer(ICON_CONTAINER_BASE_STYLE) : ICON_CONTAINER_BASE_STYLE);
    const [icons, setIcons] = useState(iconSearchResults?.slice(0, (rowCount + 1) * colCount) || []);
    const [iconsContainerScrollTop, setIconsContainerScrollTop] = useState(0);
    const [loading, setLoading] = useState(false);
    const debouncedUpdateScrollTop = useDebounce((e: { target: HTMLDivElement }) => setIconsContainerScrollTop(e.target.scrollTop), 100, []);
    const throttledIconsUpdate = useThrottle(() => {
        setLoading(true);
        setTimeout(() => {
            const newIcons = [ ...icons, ...iconSearchResults.slice(icons.length, icons.length + DEFAULT_ROW_ADDITION_NUMBER * colCount)]
            typeof onIconsChange === 'function' && onIconsChange(newIcons);
            setIcons(newIcons);
            setLoading(false);
        }, 1000);
    }, 1000, []);
    
    useEffect(() => {
        setIcons(iconSearchResults?.slice(0, (rowCount + 1) * colCount) || []);
        iconsContainerRef.current.scrollTop = 0;
    }, [iconSearch]);

    useEffect(() => {
        if(loading) iconsContainerRef.current.scrollTop = iconsContainerRef.current.scrollHeight;
    }, [loading]);
    
    useEffect(() => {
        setIcons(iconSearchResults?.slice(0, (rowCount + 1) * colCount) || []);
    }, [rowCount, colCount]);

    useUpdate(() => typeof onIconsChange === 'function' && onIconsChange(iconSearchResults?.slice(0, (rowCount + 1) * colCount) || []), [iconSearch]);

    return (
        <div
            style={
                iconsContainer
                    ? iconsContainer(ICONS_CONTAINER_BASE_STYLE(rowCount, colCount))
                    : ICONS_CONTAINER_BASE_STYLE(rowCount, colCount)
            }
            ref={iconsContainerRef}
            onScroll={(e: UIEvent<HTMLElement>) => {
                const eventTarget = e.target as HTMLElement;
                if(eventTarget.scrollTop + eventTarget.clientHeight === eventTarget.scrollHeight && icons.length < iconSearchResults.length) {
                    throttledIconsUpdate();
                }
                debouncedUpdateScrollTop(e);
            }}
            data-testid='mip-iconsContainer'
        >
            {icons.length ? <>
                {icons.map((icon: string) => (
                    <Icon
                        styles={{ iconContainer, icon: iconStyle, iconTip }}
                        icon={icon}
                        type={type}
                        hsva={hsvaProp || hsva}
                        ref={iconsContainerRef}
                        iconsContainerScrollTop={iconsContainerScrollTop}
                        onIconClick={onIconClick}
                        onIconMouseEnter={onIconMouseEnter}
                        showIconTip={showIconTip}
                        setIconTipText={setIconTipText}
                    />
                ))}
                {loading && <div
                    style={loadingContainer ? loadingContainer(LOADING_CONTAINER_BASE_STYLE) : LOADING_CONTAINER_BASE_STYLE}
                    data-testid='mip-loadingContainer'
                >
                    <img
                        src={LoadingIcon}
                        style={loadingStyle ? loadingStyle(LOADING_BASE_STYLE) : LOADING_BASE_STYLE}
                        className={cssStyles.rotate}
                        data-testid='mip-loading'
                    />
                </div>}
            </> : (
                <div
                    style={
                        iconsContainerPlaceholder
                            ? iconsContainerPlaceholder(
                                  ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE
                              )
                            : ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE
                    }
                    data-testid='mip-iconsContainerPlaceholder'
                >
                    {TEXT.NO_ICON_FOUND}
                </div>
            )}
        </div>
    );
};