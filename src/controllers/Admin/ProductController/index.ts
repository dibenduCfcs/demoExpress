import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { HttpGet } from '../../../commonUtility/commonFunction';
import { UserRepository } from '../../../respository/UserRepository';
import { UserModel } from '../../../modal/UserModal';
import { JsonResponse } from '../../../class/response';

class ProductController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  @HttpGet('/getAllProduct', UserModel)
  async createNewUser(
    req: Request<{}, JsonResponse, UserModel>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      return await this.userRepository.createUser(req, res);
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
