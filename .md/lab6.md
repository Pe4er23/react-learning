1. Власноруч написаний кастомний хук useFetch.jsx
```jsx
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController для скасування запиту,
    // якщо компонент розмонтовується (захист від витоку пам'яті)
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`Помилка HTTP: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Запит скасовано");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Функція очищення (cleanup)
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};
```

2. Компонент Стрічки новин (NewsFeed.jsx)
```jsx
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
        {posts &&
          posts
            .slice(0, 10)
            .map((post) => (
              <PostCard key={post.id} title={post.title} body={post.body} />
            ))}
      </div>
    </div>
  );
};

export default NewsFeed;
```


* * Відповіді на контрольні запитання
1) Поясніть призначення об’єкта AbortController у нашому хуку useFetch. Яку загрозу для React-додатку він усуває?
Об’єкт AbortController використовується для скасування запиту, якщо компонент розмонтовується. Він усуває загрозу витоку пам'яті. Якщо користувач швидко перейде на іншу сторінку до того, як сервер поверне відповідь, React спробує оновити стан (setData або setError) компонента, якого вже немає в DOM-дереві, що призведе до помилки. AbortController зупиняє цей процес.


2) Що таке патерн "Тріада станів" (loading, error, data) при роботі з мережею і чому він є обов’язковим для якісного UX?
Цей патерн реалізується для покращення користувацького досвіду (UX). Оскільки мережеві запити потребують часу, інтерфейс має реагувати на кожен етап: показувати індикатор (loading), щоб користувач розумів, що процес іде і додаток не "завис"; виводити інформативне повідомлення у разі збою (error); і коректно рендерити контент при успіху (data).


3) Чому функція виконання мережевого запиту (fetch або axios.get) розміщується всередині хука useEffect, а не прямо в тілі функціонального компонента?
Мережевий запит є "побічним ефектом" (side effect). Будь-який код у тілі функціонального компонента виконується при кожному його рендері. Якби ми розмістили запит безпосередньо там, оновлення стану після отримання даних викликало б новий рендер, який знову запустив би запит, утворюючи нескінченний цикл і перевантажуючи сервер. useEffect дозволяє ізолювати запит і виконати його контрольовано (наприклад, лише один раз при монтуванні).


4) У чому полягають головні переваги використання бібліотеки axios у порівнянні з нативним fetch?
axios автоматично парсить JSON та краще обробляє помилки статусів. Нативний fetch не вважає HTTP-статуси 404 (Not Found) або 500 (Internal Server Error) помилками мережі, тому розробнику доводиться вручну перевіряти властивість response.ok. Крім того, axios підтримує зручні перехоплювачі (interceptors) для автоматичного додавання токенів авторизації.


5) Опишіть потенційні ризики багу "Стан гонитви" (Race Condition), якщо користувач буде дуже швидко перемикати сторінки з різними URL-параметрами, за якими робляться запити.
"Стан гонитви" виникає, коли порядок завершення кількох асинхронних запитів не збігається з порядком їх ініціалізації через різну затримку мережі. Наприклад, якщо швидко перемкнути фільтри з Категорії А на Категорію Б, запит для А може повернутися пізніше за запит для Б. У результаті інтерфейс відобразить дані А, хоча користувач обрав Б. Використання функції очищення з AbortController ефективно скасовує попередні "неактуальні" запити, гарантуючи правильність даних.