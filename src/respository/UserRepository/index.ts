import { Response } from 'express';
import { JsonResponse } from '../../class/response';
import { UserLoginModel } from '../../modal/UserLoginModal';
import { CommonUtility } from 'express-swagger-decorators';
import { UserModel } from '../../modal/UserModal';
import Database, { dbIntance } from '../../database';
import {
  comparePassword,
  generateLoginHash,
  hashPassword,
} from '../../commonUtility/commonFunction';
class UserRepository {
  commonUtility: CommonUtility;
  dbContext: Database;

  constructor() {
    this.commonUtility = new CommonUtility();
    this.dbContext = dbIntance;
  }

  async createUser(prm: UserModel['schema'], res: Response) {
    let password = await hashPassword(prm.password);
    let validateRole = await this.dbContext.findOne('UserRole', {
      roleId: prm.roleId,
    });
    if (!validateRole) {
      return new JsonResponse({}, 'Give Correct RoleId.', 0).send(res);
    }
    let { success, error } = await this.dbContext.insert('User', {
      ...prm,
      password,
      image: '',
    });
    if (success) {
      let response = new JsonResponse({}, 'User Added Successfully.');
      return response.send(res);
    } else {
      let response = new JsonResponse({}, error, 0);
      return response.send(res);
    }
  }

  async userLogin(body: UserLoginModel['schema'], res: Response) {
    const { email, password } = body;
    let findUser = await this.dbContext.findOne('User', { email });
    if (!findUser) {
      return new JsonResponse({}, 'User Not Found', 0).send(res);
    }
    let userSavePassword = findUser.password ?? '';
    let checkPassword = await comparePassword(password, userSavePassword);
    if (!checkPassword) {
      return new JsonResponse({}, 'Invalid Password', 0).send(res);
    }
    let loginHash = await generateLoginHash(email, password);
    await this.dbContext.update('User', { email }, { loginHash });
    let token = this.commonUtility.genrateJWTToken({ email, loginHash });
    let response = new JsonResponse({ token }, 'User Login Successfully.');
    return response.send(res);
  }

  async getUserProfileDetail(authToken: string, res: Response) {
    let { email }: any = this.commonUtility.decodeJWTToken(authToken);
    let findUser = await this.dbContext.findOne('User', { email });
    let response = new JsonResponse(
      findUser,
      'Profile Detail Fetched Successfully.',
    );
    return response.send(res);
  }
}
export { UserRepository };
