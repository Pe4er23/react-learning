import { useState } from "react";

function Post({ id, title, content, author }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    // Тут ми зробимо помилку у завданні №2
    setLikes(likes + 1);
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
      <h3>{title}</h3>
      <p>{content}</p>
      <small>Автор: {author}</small>
      <br />
      <button onClick={handleLike}>Like ({likes})</button>
    </div>
  );
}

export default Post;