import { UserRoutes } from './User';
import { AbstractRouter } from '../Base';

class AdminRoutes extends AbstractRouter {

    constructor(){
       super()
    }

     getRouteConfig() {
        return {
            parentController: AdminRoutes,
            childControllers: [{childRouter:UserRoutes, routerBasePath:'/User'}]
        };
    }
}

export  {AdminRoutes};
