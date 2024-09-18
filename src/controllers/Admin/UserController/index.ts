import 'reflect-metadata'
import { Request, Response } from "express";
import { HttpPost } from "../../../commonUtility/commonFunction";
import { UserRepository } from "../../../respository/UserRepository";
import { UserModel } from "../../../modal/UserModal";

class UserController {

   private userRepository: UserRepository;

    constructor (){
        this.userRepository = new UserRepository();
    }
    
    @HttpPost('/createNewUser',UserModel)
    async createNewUser(req:Request<{},any,UserModel>, res:Response, next:any) {
        try {
           return await this.userRepository.createUser(req,res)
        } catch (error) {
            next(error)
        } 
    }
    
    @HttpPost('/updateUser',UserModel)
    async updateUser(req:Request<{},any,UserModel>, res:Response, next:any) {
        try {
        //    return await this.userRepository.createUser(req,res)
        return res.json(200).send({})
        } catch (error) {
            next(error)
        } 
    }
    
}

export  {UserController}