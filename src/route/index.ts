// import { UserController } from "../controllers/App/UserController";
import { RegisterRoutes } from "../commonUtility/commonFunction";
import { AdminRoutes } from "./Admin";
import { AppRoutes } from "./App";
import { AbstractRouter } from "./Base";

class Routes extends AbstractRouter {

    constructor(){
       super()
    }

     getRouteConfig(): RegisterRoutes<any> {
        return {
            parentInstance:this,
            childControllers:[
                {childRouter:AdminRoutes, routerBasePath:'/Admin'},
                {childRouter:AppRoutes, routerBasePath:'/App'}
                // {childRouter:UserController, routerBasePath:'/myUser'}
            ],
        };
    }
}



export {Routes};


