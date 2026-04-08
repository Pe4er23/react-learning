import { Routes, Route } from "react-router-dom";
import NewsFeed from "./pages/NewsFeed";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsFeed />} />
      {/* Динамічний маршрут: postId буде змінною */}
      <Route path="/post/:postId" element={<PostDetails />} />
    </Routes>
  );
}

export default App;