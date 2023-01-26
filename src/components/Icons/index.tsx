import { MATERIAL_ICONS } from '../../assets/materialIcons';
import { TEXT } from '../../lib/constants';
import {
    getIconsContainerRowColCounts,
    ICONS_CONTAINER_BASE_STYLE,
    ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE,
    LOADING_CONTAINER_BASE_STYLE,
    LOADING_BASE_STYLE,
    ICONS_GRID_BASE_STYLE,
} from './styles';
import { IIcons } from './types';
import { Icon } from '../Icon';
import { useElementSize, useThrottle } from '../../lib/hooks';
import { useEffect, useRef, useState } from 'react';
import { ICON_CONTAINER_BASE_STYLE } from '../Icon/styles';
import LoadingIcon from '../../assets/icons/loading.svg';
import cssStyles from './styles.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(cssStyles);

export const Icons = (props: IIcons) => {
    const { styles = {}, iconSearch, type, hsva, defaultIconsNumber } = props;

    const {
        iconsContainer,
        iconsGrid,
        iconContainer,
        icon: iconStyle,
        iconTip,
        iconsContainerPlaceholder,
        loadingContainer,
        loading,
    } = styles;

    const [iconsGridScrollTop, setIconsGridScrollTop] = useState(0);
    const iconSearchResults = iconSearch
        ? MATERIAL_ICONS.filter((s) =>
              s.toLowerCase().includes(iconSearch.toLowerCase())
          )
        : MATERIAL_ICONS;
    const [iconsGridRef] = useElementSize();
    const { rowCount, colCount } = getIconsContainerRowColCounts(iconsGridRef, iconContainer ? iconContainer(ICON_CONTAINER_BASE_STYLE) : ICON_CONTAINER_BASE_STYLE);
    const [icons, setIcons] = useState<any>(iconSearchResults?.slice(0, rowCount * colCount) || []);
    const [showLoading, setShowLoading] = useState(false);
    const iconsGridScrollTopRef = useRef<number>(0);

    useEffect(() => {
        if(iconsGridRef.current) iconsGridRef.current.scrollTop = 0//iconsGridScrollTopRef.current;
    }, [icons]);

    useEffect(() => {
        setIcons(iconSearchResults?.slice(0, rowCount * colCount) || []);
    }, [iconSearch]);
    
    useEffect(() => {
        setIcons(iconSearchResults?.slice(0, rowCount * colCount) || []);
    }, [rowCount, colCount]);

    return (
        <div
            style={
                iconsContainer
                    ? iconsContainer(ICONS_CONTAINER_BASE_STYLE)
                    : ICONS_CONTAINER_BASE_STYLE
            }
        >
            <div
                style={
                    iconsGrid
                        ? iconsGrid(ICONS_GRID_BASE_STYLE)
                        : ICONS_GRID_BASE_STYLE
                }
                ref={iconsGridRef}
                onScroll={(e: any) => {
                    if(e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight && icons.length < iconSearchResults.length) {
                        iconsGridScrollTopRef.current = e.target.scrollTop;
                        setShowLoading(true);
                        setTimeout(() => {
                            setIcons([ ...icons, ...iconSearchResults.slice(icons.length, icons.length + 5 * colCount)]);
                            setShowLoading(false);
                        }, 500);
                    }
                    setIconsGridScrollTop(e.target.scrollTop);
                }}
            >
                {icons.length ? (
                    icons.map((icon: string) => (
                        <Icon
                            styles={{ iconContainer, icon: iconStyle, iconTip }}
                            icon={icon}
                            type={type}
                            hsva={hsva}
                            ref={iconsGridRef}
                            iconsGridScrollTop={iconsGridScrollTop}
                        />
                    ))
                ) : (
                    <div
                        style={
                            iconsContainerPlaceholder
                                ? iconsContainerPlaceholder(
                                      ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE
                                  )
                                : ICONS_CONTAINER_PLACEHOLDER_BASE_STYLE
                        }
                    >
                        {TEXT.NO_ICON_FOUND}
                    </div>
                )}
            </div>
            {showLoading && <div
                style={loadingContainer ? loadingContainer(LOADING_CONTAINER_BASE_STYLE) : LOADING_CONTAINER_BASE_STYLE}
            >
                <img
                    src={LoadingIcon}
                    style={
                        loading 
                            ? loading(LOADING_BASE_STYLE(iconsGridRef, iconsGridScrollTop))
                            : LOADING_BASE_STYLE(iconsGridRef, iconsGridScrollTop)
                    }
                    className={cx(cssStyles.rotate)}
                />
            </div>}
        </div>
    );
};
