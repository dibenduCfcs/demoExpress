import 'reflect-metadata';
import { NextFunction, Response } from 'express';
import { UserRepository } from '../../../respository/UserRepository';
import { UserLoginModel } from '../../../modal/UserLoginModal';
import {
  ControllerRoute,
  FromBody,
  HttpPost,
  ResponseDecorator,
  Next,
  FromHeader,
  Authenticate,
  HttpGet,
} from 'express-swagger-decorators';

@ControllerRoute('/App/User')
class UserController {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  @HttpPost('userLogin', UserLoginModel)
  async userLogin(
    @FromBody() body: UserLoginModel['schema'],
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.userRepository.userLogin(body, res);
    } catch (error) {
      next(error);
    }
  }

  @HttpGet('getUserProfileDetail')
  @Authenticate()
  async getUserProfileDetail(
    @FromHeader('authorization') token: string,
    @ResponseDecorator()
    res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.userRepository.getUserProfileDetail(
        token.split(' ')[1],
        res,
      );
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
