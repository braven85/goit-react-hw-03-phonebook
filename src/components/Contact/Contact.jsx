import styles from "./Contact.module.css";
import PropTypes from "prop-types";

export const Contact = ({ id, name, number, removeContact }) => {
  return (
    <li key={id} className={styles.Contact__item}>
      {name}: {number}
      <button
        className={styles.Contact__button}
        type="button"
        onClick={() => removeContact(id)}
      >
        Remove
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  removeContact: PropTypes.func,
};
