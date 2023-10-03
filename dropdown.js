import { getCrimeType, getEvents } from './data.js';


class Dropdown {
  constructor(options, text) {
    // Створюємо основний контейнер для випадаючого списку
    this.container = document.createElement('div');
    this.container.classList.add('dropdown-container');
  
    // Створюємо кнопку для відкриття списку
    const button = document.createElement('div');
    button.classList.add('dropdown-button');
  
    const textButton = document.createElement('div');
    textButton.textContent = text;
    textButton.classList.add('text-button');
  
    const angle = document.createElement('img');
    angle.src = '/img/angle-small-down.svg';
    angle.classList.add('angle-img');
  
    // Додаємо текстовий елемент та зображення до кнопки
    button.appendChild(textButton);
    button.appendChild(angle);
  
    // Додаємо кнопку до контейнера
    this.container.appendChild(button);
  
    // Створюємо список із варіантами
    this.list = document.createElement('div');
    this.list.classList.add('dropdown-list');
    this.list.style.display = 'none';
  
    // Додаємо варіанти до списку з масиву options
    options.forEach((optionText) => {
      const listItem = document.createElement('div');
      listItem.textContent = optionText;
      listItem.classList.add('dropdown-item');
      listItem.addEventListener('click', () => {
        // При кліку на варіант, встановлюємо вміст кнопки
        textButton.textContent = optionText; // Оновлюємо текст кнопки
        this.list.style.display = 'none';
      });
      this.list.appendChild(listItem);
    });
  
    // Додаємо список до контейнера
    this.container.appendChild(this.list);
  
    // Додаємо обробник кліку на кнопку для показу/приховування списку
    button.addEventListener('click', () => {
      if (this.list.style.display === 'none') {
        this.list.style.display = 'block';
      } else {
        this.list.style.display = 'none';
      }
    });
  }
  
  // Додаємо метод appendTo до прототипу конструктора Dropdown
  appendTo(element) {
    element.appendChild(this.container);
  }
}


getEvents()
  .then((result) => {
    // Створюємо Dropdown після отримання даних
    const options1 = Object.keys(result); // Отримуємо ключі об'єкта
    const text = 'All States';
    const dropdown1 = new Dropdown(options1, text);

    const container1 = document.getElementById('dropdown-region');
    dropdown1.appendTo(container1);
  })
  .catch((error) => {
    console.error(error);
  });
  
const options2 = ['Item A', 'Item B', 'Item C'];
const text2 = 'All Cities / Towns'
const dropdown2 = new Dropdown(options2, text2);


const container2 = document.getElementById('dropdown-city');
dropdown2.appendTo(container2);
