import {showCartCards, cartCounter} from './cart';

//корзина. функция показывает/скрывает окно корзины
//при нажатии на иконку корзины
function toggleCart() {
  const btnCart = document.getElementById('cart'), 
        modalCart = document.querySelector('.cart'),
        btnCartClose = document.querySelector('.cart-close');

  btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    showCartCards();
  })

  btnCartClose.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
    
    cartCounter();
  })
}

export {toggleCart};