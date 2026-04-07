import { useParams, useNavigate } from 'react-router-dom';
import { postsData } from '../../data';
const PostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const post = postsData.find(p => p.id === Number(postId));
    if (!post) {
        return <div className={styles.error}>Пост із ID {postId} не
            знайдено.</div>;
    }
    return (
        <article className={styles.article}>
            <button onClick={() => navigate(-1)}
                className={styles.backButton}>
                ← Повернутися
            </button>
            <header>
                <h1>{post.title}</h1>
                <p>Автор: <strong>{post.author}</strong></p>
            </header>
            <div className={styles.body}>{post.content}</div>
        </article>
    );
};