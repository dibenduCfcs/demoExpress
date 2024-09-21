
import { UserController } from "../../../controllers/Admin/UserController";
import { ProductController } from "../../../controllers/Admin/ProductController";
import { AbstractRouter } from "../../Base";
import { RegisterRoutes } from "../../../commonUtility/commonFunction";

class UserRoutes extends AbstractRouter {
    constructor(){
       super()
    }
     getRouteConfig(): RegisterRoutes<any> {
        return {
            parentInstance: this,
            childControllers: [{
                childRouter: UserController,
                routerBasePath: ''
            },{
                childRouter: ProductController,
                routerBasePath: ''
            }],
        };
    }
}

export {UserRoutes}; 
