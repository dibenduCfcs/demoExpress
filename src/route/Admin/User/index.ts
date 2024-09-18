
import { UserController } from "../../../controllers/Admin/UserController";
import { ProductController } from "../../../controllers/Admin/ProductController";
import { AbstractRouter } from "../../Base";

class UserRoutes extends AbstractRouter {
    constructor(){
       super()
    }
     getRouteConfig() {
        return {
            parentController: UserRoutes,
            childControllers: [{
                childRouter: UserController,
                routerBasePath: ''
            },{
                childRouter: ProductController,
                routerBasePath: ''
            }],
            isBaseLevel:true
        };
    }
}

export {UserRoutes}; 
