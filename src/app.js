import page from 'page';
import { decorateContext, loggedUserOnly } from './middleware/render';

import { carsCatalogPage } from './views/car/catalogPage/catalogController';
import { addCarPage } from './views/car/createPage/createController';
import { editCarPage } from './views/car/editPage/editController';

import { repairsCatalogPage } from './views/repair/catalogPage/catalogController';
import { addRepairPage } from './views/repair/createPage/createController';
import { detailsRepairPage } from './views/repair/detailsPage/detailsController';
import { editRepairPage } from './views/repair/editPage/editController';

import { loginPage } from './views/user/loginPage/loginController';
import { registerPage } from './views/user/registerPage/registerController';

page(decorateContext);

page('/catalog/cars', loggedUserOnly, carsCatalogPage);
page('/create/car', loggedUserOnly, addCarPage);
page('/edit/car/:id', loggedUserOnly, editCarPage);

page('/catalog/repairs/:id', loggedUserOnly, repairsCatalogPage);
page('/create/repair/:id', loggedUserOnly, addRepairPage);
page('/edit/repair/:id', loggedUserOnly, editRepairPage);
page('/details/repair/:id', loggedUserOnly, detailsRepairPage);

page('/user/login', loginPage);
page('/user/register', registerPage);

page.start();