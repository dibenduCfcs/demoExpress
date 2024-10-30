import { AbstractRouter } from 'express-swagger-decorators';
import { UserController } from '../controllers/Admin/UserController';
import { UserController as UserControllerApp } from '../controllers/App/UserController';
import { MasterController } from '../controllers/Admin/MasterController';
import { CustomerController } from '../controllers/App/CustomerController';
import { PropertyController } from '../controllers/Admin/PropertyController';
import { DropDownController } from '../controllers/Common/DropDown';

class Routes extends AbstractRouter {
  constructor() {
    super();
  }
  getControllerList() {
    return [
      { childRouter: UserController },
      { childRouter: PropertyController },
      { childRouter: UserControllerApp },
      { childRouter: MasterController },
      { childRouter: CustomerController },
      { childRouter: DropDownController },
    ];
  }
}

export { Routes };
