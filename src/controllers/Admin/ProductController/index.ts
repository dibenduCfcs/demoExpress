import 'reflect-metadata'
import { Request, Response } from "express";
import { HttpGet } from "../../../commonUtility/commonFunction";
import { UserRepository } from "../../../respository/UserRepository";
import { UserModel } from "../../../modal/UserModal";

class ProductController {

   private userRepository: UserRepository;

    constructor (){
        this.userRepository = new UserRepository();
    }
    
    @HttpGet('/getAllProduct',UserModel)
    async createNewUser(req:Request<{},any,UserModel>, res:Response, next:any) {
        try {
           return await this.userRepository.createUser(req,res)
        } catch (error) {
            next(error)
        } 
    }
    
}

export  {ProductController}