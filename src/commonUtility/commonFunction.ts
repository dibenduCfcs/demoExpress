import 'reflect-metadata';
import { Router,RequestHandler, NextFunction, Response,Express } from "express";
import { JsonResponse } from '../class/response';
import { BaseModel, SchemaDefinition } from '../modal/BaseModal';
import { generateSwaggerOperation } from '../swagger/swagger.common';
import { CommonUtility, RequestType } from '.';
import { AbstractRouter } from '../route/Base';

export const routesMetadataKey = Symbol('routesMetadata');

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface Route<T=any> {
    method: HttpMethod;
    path: string;
    basePath?:string;
    name?:string;
    routeName?:string |null;
    handler: RequestHandler;
    controller?:new () => T
    model?: T;
}

export interface Controller {
    routes?: Route[];
    router:Router;
    getRouter():Router;
}

export interface ValidateModal {
    schema: SchemaDefinition
    validate: (body:any)=> { valid:boolean, errors:string[]};
}


export const Authenticate = (requiresAuth: boolean = true) => {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('requiresAuth', requiresAuth, target, propertyKey);
  };
};


const authValidation = (requiresAuth:string,req:RequestType,res:Response,next:NextFunction,modelInstance:any) => {
  if (requiresAuth) {
    // Perform JWT authentication here
    let commmonUtility = new CommonUtility();
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        commmonUtility.verifyJWTToken(token,(err, info)=>{
          if (err) {
            return new JsonResponse({},'Session expired',10).send(res); // Invalid token
        }
        req.userInfo = info; // Attach the JWT claims (like user info) to req.user
        next();
        })

    } else {
      return new JsonResponse({},'Session expired',10).send(res); // Invalid token
    }
  }
  // Perform model validation
  const { valid, errors } = modelInstance.validate(req.body);

  if (!valid) {
    // Return validation failure response
    return new JsonResponse({}, `Validation Failed - ${errors.join(', ')}`).send(res);
  }


}



function createHttpMethodSwaggerDecorator<T extends BaseModel>(
    method: HttpMethod
  ) {
    return function (path: string, model: new () => T) {
      return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const modelInstance = new model();

        // Store the original method for later use
      const originalMethod = descriptor.value;
      const requiresAuth = Reflect.getMetadata('requiresAuth', target, propertyKey) ?? false;
      if (method !== 'get'){
        descriptor.value = async function (req: RequestType, res: Response, next: NextFunction) {
          authValidation(requiresAuth,req,res,next,modelInstance)
          // Call the original method if validation succeeds
          return originalMethod.apply(this, [req, res, next]);
        };
      }
      // Redefine the method to include validation logic
     

        // Generate Swagger metadata
        const swaggerMetadata = 
          generateSwaggerOperation(target.constructor.name,method, modelInstance.getModalSchema(),requiresAuth,['username','mobile']) || 
          modelInstance.getSwaggerMetadata();
  
        // Store Swagger metadata for the specified method
        Reflect.defineMetadata(`swagger:${method}`, swaggerMetadata, target, propertyKey);
  
        // Handle route metadata
        const existingRoutes: Route[] = Reflect.getMetadata(routesMetadataKey, target) || [];
        existingRoutes.push({
          method,
          path,
          routeName:null,
          name:propertyKey,
          handler: descriptor.value,
          model: modelInstance,  // Pass the model instance
          basePath: '',           // You can set the base path here if required
          controller: target.constructor, // The name of the controller
        })
  
        Reflect.defineMetadata(routesMetadataKey, existingRoutes, target);
      };
    };
  }
  

  export const HttpGet = <T extends BaseModel>(path: string, model: new () => T) => 
    createHttpMethodSwaggerDecorator<T>('get')(path, model);
  
  export const HttpPost = <T extends BaseModel>(path: string, model: new () => T) => 
    createHttpMethodSwaggerDecorator<T>('post')(path, model);
  
  export const HttpPut = <T extends BaseModel>(path: string, model: new () => T) => 
    createHttpMethodSwaggerDecorator<T>('put')(path, model);
  
  export const HttpDelete = <T extends BaseModel>(path: string, model: new () => T) => 
    createHttpMethodSwaggerDecorator<T>('delete')(path, model);
  



function updateRouteBasePath<T extends Controller>(controller: new () => T,routerBasePath: string = ''){
    const instance = new controller();
     let routeData: Route[] = Reflect.getMetadata(routesMetadataKey, instance);
     if (!routeData || routeData.length === 0) {
         return; 
     }
     routeData = routeData.map(route => {
         const updatedBasePath = `${routerBasePath}${route.basePath ?? ''}`;
          return {
             ...route,
             basePath: updatedBasePath, 
         };
     });
     Reflect.defineMetadata(routesMetadataKey, routeData, controller.prototype);
}


export interface RegisterRoutes<T>{
  parentController:new ()=> T,
  childControllers: {
    childRouter: new ()=> T,
    routerBasePath: string
  }[]
  isTopLevel?:boolean
  isBaseLevel?:boolean
  callback?:(parentRouter:Router)=>void
}

function registerRoutetoRoutes(options:RegisterRoutes<any>){
  const {parentController, childControllers} = options;
  const isTopLevel = options.isTopLevel ?? false;
  const isBaseLevel = options.isBaseLevel ?? false;
  const parentControllerInstance = new parentController();
  const parentRouter = isTopLevel? parentControllerInstance.getInstance() as Express: parentControllerInstance.router;

  options.callback && options.callback(parentRouter)
 
  const registerRoutetoRoutesUtil = (childRouter:new () => AbstractRouter,  routerBasePath: string = '') =>{
    const instance = new childRouter();
    let routeData: Route[] = Reflect.getMetadata(routesMetadataKey, instance);
    if (!routeData || routeData.length === 0) {
        return; // No routes defined, exit early
    }
    routeData.forEach(route => {
        if (route.controller !== undefined){
            if (route.routeName===null){
               return true;
            }
          const isChildRouteNull = registerRoutetoRoutesUtil(route.controller,routerBasePath);
          if (isChildRouteNull){
            updateRouteBasePath(route.controller,routerBasePath);
          }
        }
    });
    return true;
  }

  const registerControllerRoutes = (controller:new ()=> any, router:Router, routerBasePath:string)=> {
    let controllerInstance = new controller();
    let routeData: Route[] = Reflect.getMetadata(routesMetadataKey, controllerInstance);
    if (!routeData || routeData.length === 0) {
        return;
    }
    routeData.forEach(route => {
          router[route.method](route.path, route.handler.bind(controllerInstance));
    });
    Reflect.defineMetadata(routesMetadataKey, routeData, controller.prototype);
  }


    if (childControllers === undefined || childControllers.length == 0){
      return;
    }

    childControllers.forEach((childController:any)=>{
      const newChildInstance:any = new childController.childRouter();
      if (isBaseLevel){
        registerControllerRoutes(childController.childRouter,parentRouter,childController.routerBasePath)
      } else{
        let childRouter =  newChildInstance.getRouter();
        parentRouter.use(childController.routerBasePath, childRouter)
      }
    })
  

    let existingControllerMetaData = Reflect.getMetadata(routesMetadataKey, parentController.prototype);
    
    if(existingControllerMetaData===undefined){
      existingControllerMetaData = [];
    }

    childControllers.forEach(childController=>{
      registerRoutetoRoutesUtil(childController.childRouter, childController.routerBasePath);
      existingControllerMetaData.push({routeName:childController.childRouter.constructor.prototype, controller:childController.childRouter});
    })
    Reflect.defineMetadata(routesMetadataKey,existingControllerMetaData, parentController.prototype);
    return parentRouter
}



export function getControllerList<T extends Controller>(controller:new ()=> T):Set<new () => T> {
  const routes:Route[] = Reflect.getMetadata(routesMetadataKey, controller.prototype);
  let controllerList = new Set<(new ()=>T)>()
    if (!routes || routes.length === 0) {
        return new Set([]); // No routes defined, exit early
    }

  routes.forEach(route=>{
    if (route.controller !== undefined){
      if (route.routeName===null){
         return controllerList.add(route.controller);
      }

    const childControllerList = getControllerList(route.controller);
    controllerList = new Set([...controllerList, ...childControllerList]);
  }
  })
  return controllerList;
}






export  {
    registerRoutetoRoutes,
    Route,
}