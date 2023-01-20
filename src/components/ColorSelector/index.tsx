import styles from './styles.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const ColorSelector = () => {

    return <div className={cx(styles.colorWrapper)}></div>
};