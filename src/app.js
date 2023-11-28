// @ts-nocheck
import page from 'page';
import { decorateContext } from './middleware/render';
import { loginPage, onLogout, registerPage, carsCatalogPage, createCarPage, editCarPage, repairsCatalogPage, createRepairPage, detailsRepairPage, editRepairPage } from './views';

document.getElementById('logout-button')?.addEventListener('click', onLogout);

page(decorateContext);

page('/user/login', loginPage);
page('/user/register', registerPage);
page('/cars', carsCatalogPage);
page('/cars/create', createCarPage);
page('/cars/:carId/edit', editCarPage);
page('/cars/:carId/repairs', repairsCatalogPage);
page('/cars/:carId/repairs/create', createRepairPage);
page('/cars/:carId/repairs/:repairId', detailsRepairPage);
page('/cars/:carId/repairs/:repairId/edit', editRepairPage);

page.start();