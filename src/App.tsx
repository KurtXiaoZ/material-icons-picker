import styles from './styles.module.css';
import classNames from 'classnames/bind';
import { MaterialIconsPicker } from './components/MaterialIconsPicker';
import { useState, useRef } from 'react';
import { ICON_TYPES } from './lib/constants';
const cx = classNames.bind(styles);

export const App = () => {
    const [type, setType] = useState(ICON_TYPES[2]);
    const searchInputRef = useRef(null);
    return (
        <>
            <div className={cx(styles.wrapper)}>
                <MaterialIconsPicker 
                    onTypeChange={newType => setType(newType)}
                    type={type}
                    defaultType={ICON_TYPES[1]}
                />
            </div>
        </>
    );
};
