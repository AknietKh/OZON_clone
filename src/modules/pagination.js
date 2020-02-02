import {renderCards} from './renderCards';

//Пагинация. Функция принимает массив с таварами (data), которые отображены на странице и 
// откуда (whence) эти товары были запрошены (каталог, поиск)
function pagination(data, whence = '') {
  const pagination = document.querySelector('.pagination-wrapper'),
        paginationContent = document.querySelector('.pagination-content'),
        cardAmount = 8,
        paginationLength = Math.ceil(data.length / cardAmount),
        arrows = document.querySelectorAll('.arrow');

  paginationContent.textContent = '';

  if (paginationLength > 1) {
    pagination.style.display = '';

    for (let i = 1; i <= paginationLength; i++) {
      const pagNum = document.createElement('span');

      pagNum.className = 'pagination-number';
      pagNum.innerHTML = i;
      paginationContent.append(pagNum);

      pagNum.addEventListener('click', (event) => pagRequest(event));
    }

    arrows.forEach((arrow) => {
      arrow.addEventListener('click', (e) => {
        const arrow = e.target.closest('.arrow');
        arrowHandler(arrow);
      });
    });

    pagRequest(); //вызывается для того что бы отобразить первую страницу с заданными параметрами пагинации
  } else {
    pagination.style.display = 'none';
  }

  //функция обработчик, которая вызывает функцию pagRequest с аргументом-номером страницы. 
  // Т.е. отвечает за перелистывание страницы с товарами по стрелочкам
  function arrowHandler(arrow) {
    const paginationContent = document.querySelector('.pagination-content'),
          cardAmount = 8,
          paginationLength = Math.ceil(data.length / cardAmount);
  
    let activePagNum = +paginationContent.querySelector('.active').textContent;
    
    if (arrow.classList.contains('arrow-right')) {
      if (activePagNum !== paginationLength) {
        activePagNum++;
        pagRequest('', activePagNum);
      } else {
        pagRequest('', 1);
      }
    } else if (arrow.classList.contains('arrow-left')) {
      if (+activePagNum !== 1) {
        activePagNum--;
        pagRequest('', activePagNum);
      } else {
        pagRequest('', paginationLength);
      }
    }
  }

  //функция отвечающая за получение карточек товара заданной страницы (из стрелочек или при клике на номер страницы в пагинации)
  async function pagRequest(event = '', arrow = '') {
    const URL = 'http://localhost:3000/goods',
          pagNums = document.querySelectorAll('.pagination-number');
  
    let response = await fetch(`${URL}/?${whence}&_page=${event ? event.target.textContent : arrow || '1'}&_limit=8`);
    let pagCards = await response.json();
  
    renderCards(pagCards);
  
    //Определение активной страницы и выделение активной страницы в пагинации
    if (!event && !pagination.style.display && !arrow) {
      const pagNum = document.querySelector('.pagination-number');
      pagNum.classList.add('active');
    }
  
    pagNums.forEach((elem) => {
      if (event && elem === event.target) {
        elem.classList.add('active');
      } else if (event && elem !== event.target) {
        elem.classList.remove('active');
      }
  
      if (arrow) {
        if (+elem.textContent === arrow) {
          elem.classList.add('active');
        } else {
          elem.classList.remove('active');
        }
      }
    })
  }
}

export {pagination};