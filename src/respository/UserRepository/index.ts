import { Request, Response } from "express";
import { JsonResponse } from "../../class/response";
import { CommonUtility } from "../../commonUtility";


class UserRepository {

    data: any[];
    commonUtility:CommonUtility;

    constructor() {
        this.commonUtility = new CommonUtility();
        this.data = [];
    }
    
    async createUser(req:Request,res:Response){
        this.data.push(req.body);
        let response = new JsonResponse(this.data,"User Added Successfully.")
        return response.send(res)
    }

    async userLogin(req:Request,res:Response){
        let createToken = this.commonUtility.genrateJWTToken(req.body);
        let response = new JsonResponse({token: createToken},"User Login Successfully.")
        return  response.send(res);
    }

} 
export {
    UserRepository
}