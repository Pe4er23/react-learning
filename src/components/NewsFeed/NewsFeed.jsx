import React from "react";
import { useFetch } from "../../hooks/useFetch";
// Імпортуйте ваш компонент картки з попередніх робіт
import PostCard from "../PostCard/PostCard";

const NewsFeed = () => {
  // Викликаємо наш кастомний хук
  const {
    data: posts,
    isLoading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  // 1. Стан завантаження
  if (isLoading) {
    return <div className="spinner">Завантаження новин...</div>;
  }

  // 2. Стан помилки
  if (error) {
    return <div className="error-message">Сталася помилка: {error}</div>;
  }

  // 3. Стан успішного завантаження
  return (
    <div className="news-feed">
      <h2>Останні публікації</h2>
      <div className="posts-grid">
        {posts?.slice(0, 10).map((post) => (
              <PostCard key={post.id} title={post.title} body={post.body} />
            ))}
      </div>
    </div>
  );
};

export default NewsFeed;