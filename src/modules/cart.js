//модуль содержит функции для работы корзины.

//функция добавляет товар в корзину
async function addCart(good) {
  const goodClone = good;

  try {
    const postCartCards = await fetch('http://localhost:3000/cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(goodClone)
    });

    if (!postCartCards.ok) {
      throw new Error('POST. Не удалось отправить данные, ошибка: ' + postCartCards.status);
    }
  } catch (error) {
    console.error(error);
  }

  cartCounter();
}

//показывает кол-во товаров в корзине
async function cartCounter() {
  const countGoods = document.querySelector('.counter');

  try {
    const getCartCards = await fetch('http://localhost:3000/cart/');
    
    if (getCartCards.ok) {
      const response = await getCartCards.json();
      countGoods.textContent = response.length;
    } else {
      throw new Error('GET. Данные не были получены, ошибка: ' + getCartCards.status);
    }

  } catch (error) {
    console.error(error);
  }
}

//запрашивает товары, находящиеся в корзине и вызывает функцию для отрисовки товаров в корзине
async function showCartCards() {
  try {
    const getCartCards = await fetch('http://localhost:3000/cart/');
    
    if (getCartCards.ok) {
      const cartCards = await getCartCards.json();
      renderCartCards(cartCards);
    } else {
      throw new Error('GET. Данные не были получены, ошибка: ' + getCartCards.status);
    }

  } catch (error) {
    console.error(error);
  }
}

//отрисовывает карточки товаров в модальном окнце корзины
function renderCartCards(cartCards) {
  const cartWrapper = document.querySelector('.cart-wrapper'),
        cartTotal = document.querySelector('.cart-total span');
  let sum = 0;

  cartCards.forEach(item => {
    sum += item.price;
  })

  cartTotal.textContent = sum;
  cartWrapper.innerHTML = '';

  if (cartCards.length) {
    cartCards.forEach((item) => {
      const card = document.createElement('div');

      card.className = 'card';
      card.setAttribute('data-category', item.category);
      card.innerHTML = `
        ${item.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                          <div class="card-img-wrapper">
                            <span class="card-img-top"
                              style="background-image: url('${item.img}')"></span>
                          </div>
                          <div class="card-body justify-content-between">
                            <div class="card-price" style="${item.sale ? 'color:red;' : ''}">${item.price} ₽</div>
                            <h5 class="card-title">${item.title}</h5>
                            <button class="btn">Удалить из корзины</button>
                          </div>
                        </div>
      `;
      cartWrapper.append(card);

      const cardBtn = card.querySelector('.btn');
      
      cardBtn.addEventListener('click', () => {
        deleteCart(item);
      })
    })
  } else {
    const cartEmpty = document.createElement('div');

    cartEmpty.className = 'cart-empty';
    cartEmpty.innerHTML = 'Ваша корзина пока пуста';
    cartWrapper.append(cartEmpty);
  }
}

async function deleteCart(card) {
  try {
    const deleteCartCards = await fetch(`http://localhost:3000/cart/${card.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(card)
    })
    
    if (!deleteCartCards.ok) {
      throw new Error('DELETE. Не удалось удалить, ошибка: ' + deleteCartCards.status);
    }
  } catch (error) {
    console.error(error);
  }

  showCartCards();
}

export {addCart, showCartCards, cartCounter};