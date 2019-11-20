
//получение данных с сервера

function getData() {
  const goodsWrapper = document.querySelector('.goods');
  return fetch('http://localhost:3000/goods')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Данные не были получены, ошибка: ' + response.status)
      }
    })
    .catch(err => {
      console.warn(err);
      goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px; margin: 0 auto;">Упс, что-то пошло не так!</div>'
    });
}

function renderCards(data) {
  const goodsWrapper = document.querySelector('.goods');
  data.forEach((good) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-category', good.category);
    card.innerHTML = `
                ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
									<div class="card-img-wrapper">
										<span class="card-img-top"
											style="background-image: url('${good.img}')"></span>
									</div>
									<div class="card-body justify-content-between">
										<div class="card-price" style="${good.sale ? 'color:red;' : ''}">${good.price} ₽</div>
										<h5 class="card-title">${good.title}</h5>
										<button class="btn btn-primary">В корзину</button>
									</div>
								</div>
    `;
    goodsWrapper.append(card);
  })
}

//end получение данных с сервера


//Каталог
function renderCatalog() {
  const cards = document.querySelectorAll('.goods .card');
  const catalogList = document.querySelector('.catalog-list');
  const catalogBtn = document.querySelector('.catalog-button');
  const catalogWrapper = document.querySelector('.catalog');
  const filterText = document.querySelector('.filter-title h5');
  const categories = new Set();

  cards.forEach((card) => {
    categories.add(card.dataset.category);
  });

  categories.forEach((category) => {
    const li = document.createElement('li');
    li.textContent = category;
    catalogList.append(li);
  });

  const allLi = catalogList.querySelectorAll('li');

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

      filter();
    }
  });
}
//end Каталог

//фильтр акций
// функция actionPage вешает события на фильтр и чекбоксы. Так же реализован поиск по товарам
function actionPage() {
  const cards = document.querySelectorAll('.goods .card');
  const discountCheckbox = document.getElementById('discount-checkbox');
  const min = document.getElementById('min');
  const max = document.getElementById('max');
  const search = document.querySelector('.search-wrapper_input');
  const searchBtn = document.querySelector('.search-btn');

  discountCheckbox.addEventListener('click', filter);
  min.addEventListener('change', filter);
  max.addEventListener('change', filter);

  searchBtn.addEventListener('click', searchHandler);
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchHandler();
  })

  function searchHandler() {
    const searchText = new RegExp(search.value.trim(), 'i');
    cards.forEach((card) => {
      const title = card.querySelector('.card-title');
      if (!searchText.test(title.textContent)) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }

      search.value = '';
    });
  }

};

//end фильтр акций

//функия filter реализует работу фильтра, чебокса и каталога
function filter() {
  const cards = document.querySelectorAll('.goods .card');
  const discountCheckbox = document.getElementById('discount-checkbox');
  const min = document.getElementById('min');
  const max = document.getElementById('max');
  const activeLi = document.querySelector('.catalog li.active');

  cards.forEach((card) => {
    const cardPrice = card.querySelector('.card-price');
    const price = parseFloat(cardPrice.textContent);
    const discount = card.querySelector('.card-sale');

    card.style.display = '';

    if ((min.value && price < min.value) || (max.value && price > max.value)) {
      card.style.display = 'none';
    } else if (discountCheckbox.checked && !discount) {
      card.style.display = 'none';
    } else if (activeLi) {
        if (card.dataset.category !== activeLi.textContent) {
          card.style.display = 'none';
        }
    }
  });
}

// checkbox. функция отрисовки галочки в чекбоксе

function toggleCheckbox() {
  const checkbox = document.querySelectorAll('.filter-check_checkbox');

  checkbox.forEach((elem) => {
    elem.addEventListener('change', function () {
      if (this.checked) {
        this.nextElementSibling.classList.add('checked');
      } else {
        this.nextElementSibling.classList.remove('checked');
      }
    });
  });
};

//end checkbox

//корзина. функция показывает/скрывает окно корзины

function toggleCart() {
  const btnCart = document.getElementById('cart'); //иконка корзины
  const modalCart = document.querySelector('.cart');
  const btnCartClose = document.querySelector('.cart-close');

  btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  })

  btnCartClose.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
  })
}

//end корзина

//Добавление товара в корзины

function addCart() {
  const cards = document.querySelectorAll('.goods .card');
  const cartWrapper = document.querySelector('.cart-wrapper');
  const cartEmpty = document.getElementById('cart-empty');
  const countGoods = document.querySelector('.counter');

  cards.forEach((card) => {
    const btn = card.querySelector('button');

    btn.addEventListener('click', () => {
      const cardClone = card.cloneNode(true);
      cartWrapper.append(cardClone);
      showData();

      const removeBtn = cardClone.querySelector('button');
      removeBtn.textContent = 'Удалить из корзины';
      removeBtn.addEventListener('click', () => {
        cardClone.remove();
        showData();
      })
    });
  });

  //показывает общую сумму товаров в корзине и количество товаров в корзине
  function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    const cardsPrice = cartWrapper.querySelectorAll('.card-price');
    const cartTotal = document.querySelector('.cart-total span');
    let sum = 0;

    countGoods.textContent = cardsCart.length;

    cardsPrice.forEach((cardPrice) => {
      let price = parseFloat(cardPrice.textContent);
      sum += price;
    });

    cartTotal.textContent = sum;

    if (cardsCart.length) {
      cartEmpty.remove();
    } else {
      cartWrapper.append(cartEmpty);
    };
  };

};

//end добавление товара в корзину

getData().then((data) => {
  renderCards(data);
  renderCatalog();
  toggleCheckbox();
  toggleCart();
  addCart();
  actionPage();
});