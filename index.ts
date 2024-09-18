import express,{Express} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {Routes} from './src/route'
import {setupSwagger} from './src/swagger'
import { getControllerList, registerRoutetoRoutes } from './src/commonUtility/commonFunction'

class App {
   
    app: Express;

    constructor() {
        this.app = express();
    }

    addAPIRoutes(){
      return registerRoutetoRoutes({
            parentController:App,
            childControllers:[
                {childRouter:Routes, routerBasePath:'/api/v1'}
            ],
            isTopLevel:true,
            callback:(app)=> {
                app.use(cors())
                app.use(morgan('tiny'))
                app.use(express.json({limit:'1gb'}));
                app.use(express.urlencoded({ limit: '1gb', extended: true }));
                app.use(express.static("public"));  
            }
        })
    }

    getControllerListFunc(){
        return getControllerList<any>(App)
    }

    getInstance():Express{
        return this.app;
    }

}

const appInstance = new App();
const app = appInstance.addAPIRoutes(); 

setupSwagger(app,App);

app.listen(3000)

