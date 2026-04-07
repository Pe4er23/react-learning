import styles from './Input.module.css';

const Input = ({ label, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      {/* Рендеримо label тільки якщо він переданий у пропси */}
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        {...props} 
      />
    </div>
  );
};

export default Input;