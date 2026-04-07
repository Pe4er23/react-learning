import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './atoms/Input';
import Button from './atoms/Button';

// Функція валідації винесена за межі компонента 
const validate = (values) => {
  const errors = {};
  
  // Перевірка імені з використанням trim() 
  if (!values.name.trim()) {
    errors.name = "Ім'я є обов'язковим для заповнення";
  } else if (values.name.trim().length < 2) {
    errors.name = "Ім'я повинно містити принаймні 2 символи";
  }

  // Перевірка балів (від 0 до 100) 
  if (values.score === "") {
    errors.score = "Будь ласка, введіть бал";
  } else if (Number.isNaN(values.score) || values.score < 0 || values.score > 100) {
    errors.score = "Бал повинен бути числом від 0 до 100";
  }
  
  return errors;
};

function AddStudentForm({ onAddStudent }) {
  // Стан для форми та помилок 
  const [formData, setFormData] = useState({ name: '', score: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Очищення помилки під час введення коректних даних 
    if (errors[name]) {
      const currentErrors = validate({ ...formData, [name]: value });
      if (!currentErrors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігаємо перезавантаженню сторінки 

    const validationErrors = validate(formData);

    // Якщо об'єкт помилок порожній — дані валідні 
    if (Object.keys(validationErrors).length === 0) {
      onAddStudent({
        id: Date.now(),
        name: formData.name.trim(),
        score: Number(formData.score)
      });
      // Очищення форми після успішного додавання 
      setFormData({ name: '', score: '' }); 
    } else {
      setErrors(validationErrors);
    }
  };

  // Логіка для самостійного завдання 1: Блокування кнопки 
  // Кнопка неактивна, якщо є поточні помилки або поля порожні
  const isFormInvalid = Object.keys(validate(formData)).length > 0 || !formData.name.trim() || formData.score === '';

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
      <h3>Додати нового студента</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <Input
          label="Прізвище та ім'я:"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Введіть ПІБ"
        />
        {/* Умовний рендеринг помилки  */}
        {errors.name && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>{errors.name}</p>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <Input
          label="Бал студента:"
          name="score"
          // Самостійне завдання 2: Типізація вводу (браузерна валідація)
          type="number" 
          min="0"
          max="100"
          value={formData.score}
          onChange={handleChange}
          placeholder="0-100"
        />
        {errors.score && <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>{errors.score}</p>}
      </div>

      {/* Передаємо disabled у кнопку */}
      <Button type="submit" disabled={isFormInvalid}>
        Додати студента
      </Button>
    </form>
  );
}

AddStudentForm.propTypes = {
  onAddStudent: PropTypes.func.isRequired,
};

export default AddStudentForm;