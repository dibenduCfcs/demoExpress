import { Response } from 'express';
import { JsonResponse } from '../../class/response';
import { CommonUtility } from 'express-swagger-decorators';
import Database, { dbIntance } from '../../database';
import { CustomerType } from '../../modal/CustomerModal';
class CustomerRepository {
  commonUtility: CommonUtility;
  dbContext: Database;

  constructor() {
    this.commonUtility = new CommonUtility();
    this.dbContext = dbIntance;
  }

  async getCustomerList(prm: CustomerType, res: Response) {
    const userList = await this.dbContext.find('User', { roleId: 8 });

    let response = new JsonResponse(
      userList,
      'Customer List Fetched Successfully.',
      1,
    );
    return response.send(res);
  }
}
export { CustomerRepository };
