import styles from './styles.module.css';
import classNames from 'classnames/bind';
import { MaterialIconsPicker } from './components/MaterialIconsPicker';
import { useState, useRef } from 'react';
const cx = classNames.bind(styles);

export const App = () => {
    const [searchValue, setSearchValue] = useState('book');
    const searchInputRef = useRef(null);
    return (
        <>
            <div className={cx(styles.wrapper)}>
                <MaterialIconsPicker 
                    ref={{searchInputRef}}
                    onSearch={str => console.log('search input value', searchInputRef.current?.value)}
                    // onSearchValueChange={str => setSearchValue(str)}
                    // defaultSearchValue={'book'}
                />
            </div>
        </>
    );
};
