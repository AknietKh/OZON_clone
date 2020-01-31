//получение данных с сервера
function getData(request = '') {
  const goodsWrapper = document.querySelector('.goods');

  return fetch(`http://localhost:3000/goods${request}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Данные не были получены, ошибка: ' + response.status);
      }
    })
    .catch(err => {
      console.warn(err);
      goodsWrapper.innerHTML = `<div style="color: red; font-size: 30px; margin: 0 auto;">
                                  Упс, что-то пошло не так!
                                </div>`;
    });
}

export {getData};