import {getData} from './getData';
import {pagination} from './pagination';
import {renderCards} from './renderCards';
import {actionPage} from './actionPage';

//Каталог
async function renderCatalog() {
  const catalogList = document.querySelector('.catalog-list'),
        categories = new Set();

  const requestCards = await fetch('http://localhost:3000/goods');
  const responseCards = await requestCards.json();
  
  responseCards.forEach(item => {
    categories.add(item.category);
  });
  
  categories.forEach((category) => {
    const li = document.createElement('li');

    li.textContent = category;
    catalogList.append(li);
  });

  activeCategory();
}

function activeCategory() {
  const catalogBtn = document.querySelector('.catalog-button'),
        catalogWrapper = document.querySelector('.catalog'),
        filterText = document.querySelector('.filter-title h5'),
        allLi = document.querySelectorAll('.catalog-list li');

  catalogBtn.addEventListener('click', (event) => {
    if (catalogWrapper.style.display) {
      catalogWrapper.style.display = '';
    } else {
      catalogWrapper.style.display = 'block';
    }

    if (event.target.tagName === 'LI') {
      allLi.forEach((elem) => {
        if (elem === event.target) {
          elem.classList.add('active');
        } else {
          elem.classList.remove('active');
        }
      });

      filterText.textContent = event.target.textContent;

      getData(`/?category_like=${event.target.textContent}`)
        .then(data => {
          renderCards(data);
          pagination(data, `category_like=${event.target.textContent}`);
          actionPage(data);
        });
    }
  });
}

export {renderCatalog};