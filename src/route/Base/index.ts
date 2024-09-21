
import express, { Router } from "express";
import { RegisterRoutes, registerRoutetoRoutes } from "../../commonUtility/commonFunction";

abstract class AbstractRouter {
    public router: Router;

    constructor() {
        this.router = express.Router();
    }

    // Abstract method to get the route configuration; must be implemented by derived classes
     abstract getRouteConfig(): RegisterRoutes<any>;

    // Common method to register routes using the provided configuration
    public registerRouter() {
        const config = this.getRouteConfig();
        registerRoutetoRoutes(config);
    }

    // Common method to get the router, invoking the registerRouter method
    public getRouter():Router {
        this.registerRouter();
        return this.router;
    }
}

export {AbstractRouter}