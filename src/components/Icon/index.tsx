import React, { useEffect, useRef, useState } from 'react';
import { ICON_TYPES } from '../../lib/constants';
import {
    getIconTipPosition,
    ICON_BASE_STYLE,
    ICON_CONTAINER_BASE_STYLE,
    ICON_TIP_BASE_STYLE,
} from './styles';
import cssStyles from './styles.module.css';
import classNames from 'classnames/bind';
import { IIcon } from './types';

const cx = classNames.bind(cssStyles);

export const Icon = React.forwardRef((props: IIcon, ref: any) => {
    const { styles = {}, icon, type, hsva, iconsContainerScrollTop } = props;

    const { iconContainer, icon: iconStyle, iconTip } = styles;

    const iconContainerRef = useRef<HTMLDivElement | null>(null);
    const iconTipRef = useRef<HTMLDivElement | null>(null);
    // const [iconTipTop, setIconTipTop] = useState(0);
    // const [iconTipLeft, setIconTipLeft] = useState(0);
    /*const { iconTipTop = 0, iconTipLeft = 0 } = iconTipRef.current
        ? getIconTipPosition({
              containerRef: ref,
              iconTipRef,
              iconContainerRef,
          })
        : {};
    const iconTipBaseStyle = ICON_TIP_BASE_STYLE({
        top: iconTipTop,
        left: iconTipLeft,
    });
    */
    const [iconTipBaseStyle, setIconTipBaseStyle] = useState({});

    useEffect(() => {
        const { iconTipTop: top = 0, iconTipLeft: left = 0 } = getIconTipPosition({
            containerRef: ref,
            iconTipRef,
            iconContainerRef,
        });
        console.log(top, left);
        setIconTipBaseStyle(ICON_TIP_BASE_STYLE({ top, left }));
    }, [iconsContainerScrollTop]);

    return (
        <div
            style={
                iconContainer
                    ? iconContainer(ICON_CONTAINER_BASE_STYLE)
                    : ICON_CONTAINER_BASE_STYLE
            }
            className={cx(cssStyles.iconContainer)}
            ref={iconContainerRef}
            onMouseOver={() => {
                console.log(ref.current.getBoundingClientRect());
                console.log(iconContainerRef.current.getBoundingClientRect());
                console.log(iconTipRef.current.getBoundingClientRect());
            }}
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
