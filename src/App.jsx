import Post from './components/molecules/Post/Post';
import { postsData } from './data';
import styles from './App.module.css'; // Припустимо, що ви створили контейнер для стрічки
function App() {
  return (
    <div className={styles.appContainer}>
      <h1 style={{ textAlign: 'center' }}>Стрічка новин</h1>
      <div className={styles.feed}>
        {postsData.map((post) => (
          <Post
            key={post.id} // КРИТИЧНО ВАЖЛИВО!
            author={post.author}
            content={post.content}
            date={post.date}
            avatar={post.avatar}
          />
// Або можна використати spread operator: <Post key={post.id}{ ...post } />
))}
      </div>
    </div>
  );
}
export default App;