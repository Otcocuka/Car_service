


// sticky header

const header = document.querySelector(".page-header");
const toggleClass = "is-sticky";

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 150) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
});



// form handler

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const car = formData.get('car');
  const date = formData.get('date');
  const time = formData.get('time');

  const apiToken = "6091232201:AAFeK7pA7uJID96rEkiMmH649rdLvE4Pyo0";
  const chatId = "@salskdjhhakgjfhakjhwkdjbmzxjchzb";
  const text = `Имя: ${name}; Телефон: ${phone}; Автомобиль: ${car}; Дата: ${date}; Время: ${time};`;

  const urlString = `https://api.telegram.org/bot${apiToken}/sendMessage?chat_id=${chatId}&text=${text}`;

  fetch(urlString, { method: 'GET' })
      .then(response => {
          if (response.ok) {
              console.log("Запрос на запись отправлен");
              // Здесь можно очистить форму или показать сообщение об успехе
          }
      })
      .catch(error => console.error('Ошибка:', error));
});



//carousel

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const imageWrapper = carousel.querySelector('.carousel-images');
  let images = Array.from(carousel.querySelectorAll('.carousel_item'));
  const displayCount = parseInt(carousel.getAttribute('data-display-count')) || 1;
  let currentIndex = 0;
  let startX, isDragging = false;

  // Клонирование элементов для бесконечной прокрутки
  const clones = images.slice(0, displayCount).map(node => node.cloneNode(true));
  clones.forEach(clone => imageWrapper.appendChild(clone));
  images = images.concat(clones); // Обновление списка всех элементов с учетом клонов

  function updateCarousel() {
      const imageWidth = carousel.clientWidth / displayCount;
      images.forEach(img => img.style.width = `${imageWidth}px`);
      imageWrapper.style.transform = `translateX(${-imageWidth * currentIndex}px)`;

      // Проверка на достижение конца и переход к началу
      if (currentIndex >= images.length - displayCount) {
          setTimeout(() => {
              imageWrapper.style.transition = 'none';
              currentIndex = 0;
              imageWrapper.style.transform = `translateX(0px)`;
              setTimeout(() => imageWrapper.style.transition = 'transform 0.5s ease', 0);
          }, 500); // Сброс к началу после анимации
      }
  }

  // Обработчики событий для листания мышкой
  function handleDragStart(e) {
      startX = e.pageX || e.touches[0].pageX;
      isDragging = true;
      imageWrapper.style.transition = 'none';
  }

  function handleDragMove(e) {
      if (!isDragging) return;
      const x = e.pageX || e.touches[0].pageX;
      const moveBy = x - startX;
      imageWrapper.style.transform = `translateX(${-carousel.clientWidth / displayCount * currentIndex + moveBy}px)`;
  }

  function handleDragEnd() {
      isDragging = false;
      const endX = e.pageX || e.changedTouches[0].pageX;
      const offset = endX - startX;
      if (offset < -50 && currentIndex < images.length - displayCount) {
          currentIndex++;
      } else if (offset > 50 && currentIndex > 0) {
          currentIndex--;
      }
      imageWrapper.style.transition = 'transform 0.5s ease';
      updateCarousel();
  }

  imageWrapper.addEventListener('mousedown', handleDragStart);
  imageWrapper.addEventListener('touchstart', handleDragStart);
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('touchmove', handleDragMove);
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);

  // Добавление кнопок для навигации
  const prevButton = document.createElement('button');
  prevButton.innerText = '<';
  prevButton.classList.add('prev');
  carousel.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.innerText = '>';
  nextButton.classList.add('next');
  carousel.appendChild(nextButton);

  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
      } else {
          currentIndex = images.length - displayCount - 1;
          imageWrapper.style.transition = 'none';
      }
      updateCarousel();
  });

  nextButton.addEventListener('click', () => {
      if (currentIndex < images.length - displayCount) {
          currentIndex++;
      }
      updateCarousel();
  });

  // Инициализация карусели
  updateCarousel();
});




// popup
const openPopupButtons = document.querySelectorAll(".open-popup");
const closePopupButton = document.getElementById("close-popup");
const popup = document.getElementById("popup");

openPopupButtons.forEach(button => {
  button.addEventListener("click", () => {
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
  });
});

closePopupButton.addEventListener("click", () => {
  popup.style.visibility = "hidden";
  popup.style.opacity = "0";
});



// аккордеон
document.querySelectorAll('.accordion-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const accordionContent = button.nextElementSibling;
  
      button.classList.toggle('active');
  
      if (button.classList.contains('active')) {
        accordionContent.style.display = 'block';
      } else {
        accordionContent.style.display = 'none';
      }
    });
  });