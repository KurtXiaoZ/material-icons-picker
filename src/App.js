import styles from './styles.module.css';
import classNames from 'classnames/bind';
import { MaterialIconsPicker } from './package.js';
import { useState, useRef } from 'react';
import { ICON_TYPES } from './lib/constants';
const cx = classNames.bind(styles);

export const App = () => {
    const [hsva, setHsva] = useState({ h: 240, s: 100, v: 100, a: 1 });
    const searchInputRef = useRef(null);
    return (
        <>
            <div className={cx(styles.wrapper)}>
                <MaterialIconsPicker
                    setIconTipText={icon => icon + '_new_name'}
                    // defaultHsva={{ h: 100, s: 100, v: 100, a: 1 }}
                    // hsva={hsva}
                    // onHsvaChange={newHsva => setHsva(newHsva)}
                />
            </div>
        </>
    );
};