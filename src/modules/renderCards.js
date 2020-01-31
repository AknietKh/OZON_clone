import {addCart} from './cart';

//Отрисовка карточек. Функция принимает массив с товарами и рендерит на страницу
function renderCards(data) {
  const goodsWrapper = document.querySelector('.goods');

  //удаляются все карточки, чтобы перерисовать новые
  document.querySelectorAll('.card').forEach(i => i.remove());

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

    const cardBtn = card.querySelector('.btn');
    cardBtn.addEventListener('click', () => {
      addCart(good);
    });
  });
}

export {renderCards};