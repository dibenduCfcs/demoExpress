import { AdminRoutes } from "./Admin";
import { AppRoutes } from "./App";
import { AbstractRouter } from "./Base";

class Routes extends AbstractRouter {

    constructor(){
       super()
    }

     getRouteConfig() {
        return {
            parentController:Routes,
            childControllers:[
                {childRouter:AdminRoutes, routerBasePath:'/Admin'},
                {childRouter:AppRoutes, routerBasePath:'/App'}
            ],
        };
    }
}



export {Routes};


