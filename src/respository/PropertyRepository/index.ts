import { Response } from 'express';
import { JsonResponse } from '../../class/response';
import { CommonUtility } from 'express-swagger-decorators';
import Database, { dbIntance } from '../../database';
import { AddPropertyType } from '../../modal/AddProperty';
import { genrateNextId } from '../../commonUtility/commonFunction';

class PropertyRepository {
  commonUtility: CommonUtility;
  dbContext: Database;

  constructor() {
    this.commonUtility = new CommonUtility();
    this.dbContext = dbIntance;
  }

  async addNewProperty(prm: AddPropertyType, res: Response) {
    let propertyId = await genrateNextId(
      this.dbContext,
      'Property',
      'propertyId',
    );
    const addProperty = await this.dbContext.insert('Property', {
      propertyId,
      ...prm,
    });
    let response = new JsonResponse(
      addProperty,
      'Property Added Successfully.',
      1,
    );
    return response.send(res);
  }
}
export { PropertyRepository };
