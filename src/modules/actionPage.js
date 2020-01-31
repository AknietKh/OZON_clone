import {renderCards} from './renderCards';
import {pagination} from './pagination';

//фильтр акций и цены
function actionPage(data, whence = '') {
  const discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max');

  discountCheckbox.addEventListener('change', filter);
  min.addEventListener('change', filter);
  max.addEventListener('change', filter);

  function filter() {
    const discountCheckbox = document.getElementById('discount-checkbox'),
          min = document.getElementById('min'),
          max = document.getElementById('max'),
          paginationWrapper = document.querySelector('.pagination-wrapper');
    
    if (min.value || max.value) {
      let filterCards = [];
  
      data.forEach((item) => {
        if ((min.value ? (item.price > +min.value) : 1) && (max.value ? (item.price < +max.value) : 1)) {
          filterCards.push(item);
          paginationWrapper.style.display = 'none';
        }
      })
  
      if (discountCheckbox.checked) {
        let filterSaleCards = [];
  
        filterCards.forEach(item => {
          if (item.sale) filterSaleCards.push(item);
        })
  
        filterCards = filterSaleCards;
        paginationWrapper.style.display = 'none';
      }
  
      renderCards(filterCards);
  
    } else if (discountCheckbox.checked) {
      let saleCards = [];
  
      data.forEach(item => {
        if (item.sale) saleCards.push(item);
      });
  
      renderCards(saleCards);
      
      paginationWrapper.style.display = 'none';
    } else {
      renderCards(data);
      pagination(data, whence);
    }
  }
};

export {actionPage};