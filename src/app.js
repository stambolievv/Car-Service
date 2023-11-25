import page from 'page';
import { decorateContext } from './middleware/render';
import { loginPage, onLogout, registerPage, carsCatalogPage, createCarPage, editCarPage, repairsCatalogPage, createRepairPage, detailsRepairPage, editRepairPage } from './views';

document.getElementById('logout-button')?.addEventListener('click', onLogout);

page(decorateContext);

page('/user/login', (/**@type {*}*/ctx) => loginPage(ctx));
page('/user/register', (/**@type {*}*/ctx) => registerPage(ctx));
page('/cars', (/**@type {*}*/ctx) => carsCatalogPage(ctx));
page('/cars/create', (/**@type {*}*/ctx) => createCarPage(ctx));
page('/cars/:carId/edit', (/**@type {*}*/ctx) => editCarPage(ctx));
page('/cars/:carId/repairs', (/**@type {*}*/ctx) => repairsCatalogPage(ctx));
page('/cars/:carId/repairs/create', (/**@type {*}*/ctx) => createRepairPage(ctx));
page('/cars/:carId/repairs/:repairId', (/**@type {*}*/ctx) => detailsRepairPage(ctx));
page('/cars/:carId/repairs/:repairId/edit', (/**@type {*}*/ctx) => editRepairPage(ctx));

page.start();