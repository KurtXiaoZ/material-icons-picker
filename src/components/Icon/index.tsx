import { useEffect, useState, useRef } from 'react';
import { ICON_TYPES } from '../../lib/constants';
import {
    ICON_BASE_STYLE,
    ICON_CONTAINER_BASE_STYLE,
    ICON_TIP_BASE_STYLE,
} from './styles';
import cssStyles from './styles.module.css';
import classNames from 'classnames/bind';
import { IIcon } from './types';

const cx = classNames.bind(cssStyles);

export const Icon = (props: IIcon) => {
    const { styles = {}, icon, type, hsva } = props;

    const {
        iconContainer,
        icon: iconStyle,
        iconTip,
    } = styles;

    return (<div
            style={iconContainer ? iconContainer(ICON_CONTAINER_BASE_STYLE) : ICON_CONTAINER_BASE_STYLE}
            className={cx(cssStyles.iconContainer)}
        >
            <div
                className={cx(`material-icons${
                    type === ICON_TYPES[0].value ? '' : '-' + type
                }`)}
                style={
                    iconStyle
                        ? iconStyle(ICON_BASE_STYLE({ hsva }))
                        : ICON_BASE_STYLE({ hsva })
                }
            >
                {icon}
            </div>
            <div
                style={iconTip ? iconTip(ICON_TIP_BASE_STYLE({})) : ICON_TIP_BASE_STYLE({})}
                className={cx(cssStyles.iconTip)}
            >
                {icon}
            </div>
        </div>
    );
};
