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