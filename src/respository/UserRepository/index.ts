import { Request, Response } from 'express';
import { JsonResponse } from '../../class/response';
import { CommonUtility } from '../../commonUtility';
import Database from '../../database';

class UserRepository {
  commonUtility: CommonUtility;
  dbContext: Database;

  constructor() {
    this.commonUtility = new CommonUtility();
    this.dbContext = new Database();
  }

  async createUser(req: Request, res: Response) {
    let result = this.dbContext.insert('User', req.body);
    let response = new JsonResponse(result, 'User Added Successfully.');
    return response.send(res);
  }

  async userLogin(req: Request, res: Response) {
    const { mobile } = req.body;
    let findUser = await this.dbContext.find('User', { mobile });
    if (findUser.length === 0) {
      return new JsonResponse({}, 'User Not Found', 0);
    }
    let userData = findUser[0];
    let token = this.commonUtility.genrateJWTToken({ userData });
    let response = new JsonResponse({ token }, 'User Login Successfully.');
    return response.send(res);
  }
}
export { UserRepository };
