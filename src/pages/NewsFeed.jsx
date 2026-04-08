import { useSearchParams } from "react-router-dom";

// Мок-дані для прикладу
const postsData = [
  { id: 1, title: "Вивчення React Router" },
  { id: 2, title: "Новини JavaScript" },
  { id: 3, title: "Що нового у Vite" },
  { id: 4, title: "Анімації в CSS" },
];

const NewsFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Зчитуємо параметри з URL (якщо їх немає, беремо значення за замовчуванням)
  const searchQuery = searchParams.get("query") || "";
  const sortOrder = searchParams.get("sort") || "asc";

  const handleSearchChange = (e) => {
    const text = e.target.value;
    // Оновлюємо URL, зберігаючи існуючі параметри
    setSearchParams((prevParams) => {
      if (text) {
        prevParams.set("query", text);
      } else {
        prevParams.delete("query"); // Видаляємо параметр, якщо інпут порожній
      }
      return prevParams;
    });
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSearchParams((prevParams) => {
      prevParams.set("sort", order);
      return prevParams;
    });
  };

  // 1. Спочатку застосовуємо фільтрацію (пошук)
  let processedPosts = postsData.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 2. Потім застосовуємо сортування до відфільтрованого масиву
  processedPosts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title); // Від А до Я
    } else {
      return b.title.localeCompare(a.title); // Від Я до А
    }
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Стрічка новин</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Пошук новин..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '8px', width: '200px' }}
        />

        <select value={sortOrder} onChange={handleSortChange} style={{ padding: '8px' }}>
          <option value="asc">Від А до Я</option>
          <option value="desc">Від Я до А</option>
        </select>
      </div>

      <div className="posts-list">
        {processedPosts.length > 0 ? (
          processedPosts.map((post) => (
            <div key={post.id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
              {post.title}
            </div>
          ))
        ) : (
          <p>За вашим запитом "{searchQuery}" нічого не знайдено.</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;