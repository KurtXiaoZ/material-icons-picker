import styles from './styles.module.css';
import classNames from 'classnames/bind';
import { MaterialIconsPicker } from './components/MaterialIconsPicker';
const cx = classNames.bind(styles);

export const App = () => {
    return (
        <>
            <div className={cx(styles.wrapper)}>
                <MaterialIconsPicker 
                    onSearch={str => console.log('search input value', str)}
                    onSearchValueChange={str => console.log('onSearchValueChange', str)}
                />
            </div>
        </>
    );
};
