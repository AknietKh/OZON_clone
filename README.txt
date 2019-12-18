Клон магазина Ozon. Переделанная версия этого проекта https://github.com/AknietKh/OZON.
В данном проекте используется JSON server (Fake REST API) для имитации запросов на сервер
Ссылка на json server: https://github.com/typicode/json-server


Просмотр по ссылке:
Проект без json-server'a: https://codepen.io/Akniet/project/editor/Devvex

Что бы запустить у себя необходимо установить json-server. После чего в консоли в директории проекта ввести команду: json-server --watch ./db/db.json
И открыть index.html в вашем браузере.

Реализовано:
Получение товаров из json и отображение их на странице
Добавление товаров в корзину/удаление товаров из корзины.
Каталог
Поиск
Фильтр по цене и "Акции"
Пагинация