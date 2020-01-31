## О проекте

Клон магазина Ozon. Переделанная версия [этого проекта](https://github.com/AknietKh/OZON). <br/>
В данном проекте используется [JSON server](https://github.com/typicode/json-server) (Fake REST API) для имитации запросов на сервер.

### Просмотр по ссылке:
Проект без json-server'a: https://aknietkh.github.io/OZON/

Реализовано:<br/>
* Получение товаров из json и отображение их на странице<br/>
* Добавление товаров в корзину/удаление товаров из корзины.<br/>
* Каталог<br/>
* Поиск<br/>
* Фильтр по цене и "Акции"<br/>
* Пагинация<br/>

## Доступные команды (scripts)
Установить необходимые зависимости, если у вас их нет:
`npm install`<br/>
Запустить json-server:
`npm run json-server`<br/>
Запуск проекта с помощью webpack-dev-server:
`npm start`<br/>
developer сборка:
`npm run dev`<br/>
production сборка: 
`npm run build`<br/>
Скомпилировать sass в css: 
`npm run sass`<br/>

## Запуск:
    npm install
    npm run json-server
    npm start