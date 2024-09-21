
import { RegisterRoutes } from "../../../commonUtility/commonFunction";
import { UserController } from "../../../controllers/App/UserController";
import { AbstractRouter } from "../../Base";

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
            }],
        };
    }
}

export {UserRoutes}; 