import { useState } from "react";
import Post from "../Post/Post";

const mockPosts = [
  { id: 1, title: "Вивчаємо React", content: "Основи компонентів.", author: "Іван" },
  { id: 2, title: "Хуки у React", content: "UseState та UseEffect - це важливо.", author: "Petro" },
];

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = mockPosts.filter((post) => {
    // Навмисна помилка для завдання №4 (використання && замість ||)
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      <h2>Стрічка новин (Практика 6)</h2>
      <input
        type="text"
        placeholder="Пошук..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredPosts.length > 0 ? (
          // Навмисна помилка для завдання №3 (дублювання ключів)
          filteredPosts.map((post) => (
             <div key="duplicate-key" style={{ marginBottom: "16px" }}>
                <Post {...post} />
             </div>
          ))
        ) : (
          <p>Нічого не знайдено за вашим запитом.</p>
        )}
      </div>
    </div>
  );
};

export default Feed;