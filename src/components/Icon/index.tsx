import React, { RefObject, useEffect, useRef, useState } from 'react';
import { ICON_TYPES, NO_MARGIN } from '../../lib/constants';
import {
    getIconTipPosition,
    ICON_BASE_STYLE,
    ICON_CONTAINER_BASE_STYLE,
    ICON_TIP_BASE_STYLE,
} from '../../lib/styles';
import cssStyles from './styles.module.css';
import classNames from 'classnames/bind';
import { IIcon } from './types';

const cx = classNames.bind(cssStyles);

export const Icon = React.forwardRef((props: IIcon, ref: RefObject<HTMLElement>) => {
    const { styles = {}, icon, type, hsva, iconsContainerScrollTop } = props;

    const { iconContainer, icon: iconStyle, iconTip } = styles;

    const iconContainerRef = useRef<HTMLDivElement | null>(null);
    const iconTipRef = useRef<HTMLDivElement | null>(null);
    const [iconTipBaseStyle, setIconTipBaseStyle] = useState(ICON_TIP_BASE_STYLE({ top: 0, left: 0 }));

    useEffect(() => {
        const { iconTipTop: top = 0, iconTipLeft: left = 0 } = getIconTipPosition({
            containerRef: ref,
            iconTipRef,
            iconContainerRef,
        });
        setIconTipBaseStyle(ICON_TIP_BASE_STYLE({ top, left }));

    }, [iconsContainerScrollTop, icon, type, hsva, styles]);

    return (
        <div
            style={
                iconContainer
                    ? { ...iconContainer(ICON_CONTAINER_BASE_STYLE), ...NO_MARGIN }
                    : { ...ICON_CONTAINER_BASE_STYLE, ...NO_MARGIN }
            }
            className={cx(cssStyles.iconContainer)}
            ref={iconContainerRef}
            data-iconcontainer
        >
            <div
                className={cx(
                    `material-icons${
                        type === ICON_TYPES[0].value ? '' : '-' + type
                    }`
                )}
                style={
                    iconStyle
                        ? iconStyle(ICON_BASE_STYLE({ hsva }))
                        : ICON_BASE_STYLE({ hsva })
                }
            >
                {icon}
            </div>
            <div
                style={iconTip ? iconTip(iconTipBaseStyle) : iconTipBaseStyle}
                className={cx(cssStyles.iconTip)}
                ref={iconTipRef}
            >
                {icon}
            </div>
        </div>
    );
});
