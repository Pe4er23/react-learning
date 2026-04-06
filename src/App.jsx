// src/App.jsx
import { students } from './data.js';

function App() {
  // 4. Агрегація даних: обчислюємо середній бал перед return 
  const activeStudents = students.filter(student => student.isActive);
  const averageScore = activeStudents.length > 0
    ? activeStudents.reduce((acc, curr) => acc + curr.score, 0) / activeStudents.length
    : 0;

  // Самостійне завдання 1: Сортування за спадом балів
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);

  return (
    
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Всі студенти (відсортовані за балами)</h2>
      <ul>
        {/* 2. Відображення списку */}
        {sortedStudents.map(student => (
          <li
            key={student.id}
            // Самостійне завдання 2: Стилізація статусу
            style={{
              color: student.isActive ? 'black' : 'gray',
              textDecoration: student.isActive ? 'none' : 'line-through'
            }}
          >
            {student.name} — {student.score} балів
          </li>
        ))}
      </ul>

      <h2>Активні студенти з балом {'>'} 60</h2>
      <ul>
        {/* 3. Фільтрація даних */}
        {students
          .filter(student => student.isActive && student.score > 60)
          .map(student => (
            <li key={student.id}>
              {student.name} — {student.score} балів
            </li>
          ))}
      </ul>

      <h2>Статистика</h2>
      {/* Вивід результату агрегації */}
      <p>Середній бал активних студентів: <strong>{averageScore.toFixed(1)}</strong></p>
    </div>
  );
}

export default App;