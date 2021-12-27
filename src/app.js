import { page } from './lib/lib.js';
import { decorateContext, loggedUserOnly } from './middleware/render.js';

import { homePage } from './views/home/homeController.js';

import { carsCatalogPage } from './views/car/catalogPage/catalogController.js';
import { addCarPage } from './views/car/createPage/createController.js';
import { editCarPage } from './views/car/editPage/editController.js';

import { repairsCatalogPage } from './views/repair/catalogPage/catalogController.js';
import { addRepairPage } from './views/repair/createPage/createController.js';
import { detailsRepairPage } from './views/repair/detailsPage/detailsController.js';
import { editRepairPage } from './views/repair/editPage/editController.js';

import { loginPage } from './views/user/loginPage/loginController.js';
import { registerPage } from './views/user/registerPage/registerController.js';

page(decorateContext);

page('/home', homePage);

page('/catalog/cars', loggedUserOnly, carsCatalogPage);
page('/create/car', loggedUserOnly, addCarPage);
page('/edit/car/:id', loggedUserOnly, editCarPage);

page('/catalog/repairs/:id', loggedUserOnly, repairsCatalogPage);
page('/create/repair/:id', loggedUserOnly, addRepairPage);
page('/edit/repair/:id', loggedUserOnly, editRepairPage);
page('/details/repair/:id', loggedUserOnly, detailsRepairPage);

page('/user/login', loginPage);
page('/user/register', registerPage);

page.redirect('/', '/home');
page.start();
