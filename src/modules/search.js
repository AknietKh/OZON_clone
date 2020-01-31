import {getData} from './getData';
import {pagination} from './pagination';
import {renderCards} from './renderCards';
import {actionPage} from './actionPage';

//поиск
function search() {
  const search = document.querySelector('.search-wrapper_input'),
        searchBtn = document.querySelector('.search-btn');

  searchBtn.addEventListener('click', searchHandler);
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchHandler();
  });
}

function searchHandler() {
  const search = document.querySelector('.search-wrapper_input'),
        searchText = search.value.trim(),
        filterText = document.querySelector('.filter-title h5');

  getData(`/?title_like=${searchText}`)
    .then(data => {
      renderCards(data);
      pagination(data, `title_like=${searchText}`);
      actionPage(data, `title_like=${searchText}`);
    });
    
  search.value = '';
  filterText.textContent = 'Фильтр';
}

export {search};