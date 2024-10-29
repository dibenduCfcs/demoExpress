import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../../respository/UserRepository';
import { UserModel } from '../../../modal/UserModal';
import {
  ControllerRoute,
  FromBody,
  HttpPost,
  Next,
  ResponseDecorator,
} from 'express-swagger-decorators';
@ControllerRoute('/Admin')
class UserController {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  @HttpPost('createUser', UserModel)
  async createNewUser(
    @ResponseDecorator() res: Response,
    @FromBody() body: UserModel['schema'],
    @Next() next: NextFunction,
  ) {
    try {
      return await this.userRepository.createUser(body, res);
    } catch (error) {
      return next(error);
    }
  }

  @HttpPost('updateUser', UserModel)
  async updateUser(req: Request<{}, any, UserModel>, res: Response, next: any) {
    try {
      //    return await this.userRepository.createUser(req,res)
      return res.json(200).send({});
    } catch (error) {
      next(error);
    }
  }
}

export { UserController };
