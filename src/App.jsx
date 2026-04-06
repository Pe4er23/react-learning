import { useState } from 'react';
import { postsData } from './data';
import Post from './components/molecules/Post/Post';
import SearchBar from './components/molecules/SearchBar/SearchBar';
import styles from './App.module.css';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  // Логіка фільтрації
  const filteredPosts = postsData.filter(post => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category
      === activeCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <div className={styles.appContainer}>
      <h1>Стрічка з фільтрацією</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}
      />
      <div className={styles.filters}>

        {['All', 'News', 'Updates'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? styles.active : ''}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.feed}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => <Post key={post.id} {...post} />)
        ) : (
          <p className={styles.empty}>Нічого не знайдено за вашим
            запитом.</p>
        )}
      </div>
    </div>
  );
}

export default App;