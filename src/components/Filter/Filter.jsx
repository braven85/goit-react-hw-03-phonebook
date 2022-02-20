import styles from './Filter.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export const Filter = ({ filter }) => {
  const filterInputId = nanoid();
  return (
    <div className={styles.Filter__container}>
      <label className={styles.Filter__label} htmlFor={filterInputId}>
        Find contact by name:
        <br />
        <input className={styles.Filter__input} type="text" onChange={filter} id={filterInputId} />
      </label>
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.func,
};
