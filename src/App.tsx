import styles from './styles.module.css';
import classNames from 'classnames/bind';
import { MaterialIconsPicker } from './components/MaterialIconsPicker';
import { useState } from 'react';
const cx = classNames.bind(styles);

export const App = () => {
    const [searchValue, setSearchValue] = useState('book');
    return (
        <>
            <div className={cx(styles.wrapper)}>
                <MaterialIconsPicker 
                    onSearch={str => console.log('search input value', str)}
                    onSearchValueChange={str => setSearchValue(str)}
                    searchValue={searchValue}
                />
            </div>
        </>
    );
};
