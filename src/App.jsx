import Feed from "./components/Feed/Feed"; // Переконайтеся, що шлях правильний

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Дебагінг у React</h1>
      
      {/* Рендеримо компонент для практичної роботи */}
      <Feed />
      
    </div>
  );
}

export default App;