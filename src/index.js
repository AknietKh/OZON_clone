import {getData} from './modules/getData';
import {renderCards} from './modules/renderCards';
import {pagination} from './modules/pagination';
import {renderCatalog} from './modules/renderCatalog';
import {cartCounter} from './modules/cart';
import {toggleCheckbox} from './modules/toggleCheckbox';
import {toggleCart} from './modules/toggleCart';
import {search} from './modules/search';
import {actionPage} from './modules/actionPage';
import './style/style.css';

getData().then((data) => {
  renderCards(data);
  pagination(data);
  renderCatalog();
  cartCounter();
  toggleCheckbox();
  toggleCart();
  search();
  actionPage(data);
});