import styles from './PostCard.module.css';

const PostCard = ({ title, body }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{body}</p>
    </div>
  );
};

export default PostCard;