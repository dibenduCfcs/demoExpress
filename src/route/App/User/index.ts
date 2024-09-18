
import { UserController } from "../../../controllers/App/UserController";
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
            }],
            isBaseLevel:true
        };
    }
}

export {UserRoutes}; 