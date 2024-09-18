import { UserRoutes } from './User';
import { AbstractRouter } from '../Base';

class AppRoutes extends AbstractRouter {

    constructor(){
       super()
    }

     getRouteConfig() {
        return {
            parentController: AppRoutes,
            childControllers: [{childRouter:UserRoutes, routerBasePath:'/User'}]
        };
    }
}


export  {AppRoutes};