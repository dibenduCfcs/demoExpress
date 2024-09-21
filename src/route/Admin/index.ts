import { UserRoutes } from './User';
import { AbstractRouter } from '../Base';
import { RegisterRoutes } from '../../commonUtility/commonFunction';

class AdminRoutes extends AbstractRouter {

    constructor(){
       super()
    }

     getRouteConfig(): RegisterRoutes<any> {
        return {
            parentInstance: this,
            childControllers: [{childRouter:UserRoutes, routerBasePath:'/User'}]
        };
    }
}

export  {AdminRoutes};
