import 'reflect-metadata'
import { Request, Response } from "express";
import { Authenticate, HttpPost } from "../../../commonUtility/commonFunction";
import { UserRepository } from "../../../respository/UserRepository";
import { UserLoginModel } from '../../../modal/UserLoginModal';

class UserController {

   private userRepository: UserRepository;

    constructor (){
        this.userRepository = new UserRepository();
    }
   
    @HttpPost('/userLogin',UserLoginModel)
    // @Authenticate()
    async userLogin(req:Request<{},any,UserLoginModel>, res:Response, next:any) {
        try {
           return await this.userRepository.userLogin(req,res)
        } catch (error) {
            next(error)
        } 
    }
    
}

export  {UserController}