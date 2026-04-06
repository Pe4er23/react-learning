import styles from './Input.module.css';

const Input = ({ type = 'text', placeholder, label }) => {
  return (
    <div className={styles.inputWrapper}>
      {/* Рендеримо label тільки якщо він переданий у пропси */}
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Input;