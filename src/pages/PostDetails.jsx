import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PostDetails = () => {
  // Витягуємо параметр з URL. Назва postId має збігатися з назвою в <Route path="/post/:postId">
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // В Лабі 6 ми створювали useFetch, тут просто наочний приклад:
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [postId]); // Обов'язково додаємо параметр в залежності

  if (!post) return <p>Завантаження поста #{postId}...</p>;

  return (
    <div>
      <Link to="/">&larr; Назад до списку</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetails;