import { useState } from 'react';
import './App.css';

const studentsData = [
  { id: 1, name: "Іван Петров", score: 85, isActive: true },
  { id: 2, name: "Марія Іванова", score: 55, isActive: true },
  { id: 3, name: "Олег Сидоров", score: 92, isActive: false },
  { id: 4, name: "Анна Смирнова", score: 70, isActive: true },
  { id: 5, name: "Дмитро Волков", score: null, isActive: true }
];

function App() {
  const [showHelp, setShowHelp] = useState(false); 
  const [filterActive, setFilterActive] = useState(false); 
  const [activeTab, setActiveTab] = useState('list'); 

  // Фільтрація студентів
  const filteredStudents = studentsData.filter(student => student.score >= 60 && student.isActive);
  const displayedStudents = filterActive ? filteredStudents : studentsData;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Система управління студентами</h1>

      {/* 2. Просте умовне відображення (Оператор &&) */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowHelp(!showHelp)}>
          {showHelp ? "Приховати інструкцію" : "Показати інструкцію"}
        </button>
        {showHelp && <p>Довідка: Дозволяє керувати списками студентів.</p>}
      </div>

      {/* 4. Реалізація інтерфейсу з табами */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          className={activeTab === 'list' ? 'active-tab' : ''} 
          onClick={() => setActiveTab('list')}
        >
          Всі студенти
        </button>
        <button 
          className={activeTab === 'stats' ? 'active-tab' : ''} 
          onClick={() => setActiveTab('stats')}
        >
          Статистика
        </button>
        <button 
          className={activeTab === 'about' ? 'active-tab' : ''} 
          onClick={() => setActiveTab('about')}
        >
          Про автора
        </button>
      </div>

      <div className="content">
        {activeTab === 'list' && (
          <div>
            <h2>Список студентів</h2>
            <button onClick={() => setFilterActive(!filterActive)} style={{ marginBottom: '10px' }}>
              {filterActive ? "Показати всіх" : "Показати тільки успішних"} 
            </button>

            {/* Самостійне завдання 1: Порожній стан (Empty State) */}
            {displayedStudents.length === 0 ? (
              <p>За вашим запитом нікого не знайдено</p>
            ) : (
              <ul>
                {displayedStudents.map(student => (
                  <li key={student.id} style={{ marginBottom: '5px' }}>
                    {student.name} — {' '}
                    {/* Самостійне завдання 3: Захист від помилок */}
                    <strong>{student.score ?? "Оцінка відсутня"}</strong> 
                    {' '} | Статус: {' '}
                    {/* Зміна кольору тексту залежно від балу */}
                    <span style={{ color: student.score >= 60 ? 'green' : 'red' }}>
                      {student.score >= 60 ? 'Зараховано' : 'Незараховано'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            <h2>Статистика</h2>
            <p>Загальна кількість студентів: {studentsData.length}</p>
            <p>Успішних студентів (бал &gt;= 60): {studentsData.filter(s => s.score >= 60).length}</p>
          </div>
        )}

        {/* Контент таба: Про автора */}
        {activeTab === 'about' && (
          <div>
            <h2>Про автора</h2>
            <p>Цей додаток розроблено в рамках Практичної роботи №3.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;