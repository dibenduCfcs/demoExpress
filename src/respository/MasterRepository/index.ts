import { Response } from 'express';
import { JsonResponse } from '../../class/response';
import { CommonUtility } from 'express-swagger-decorators';
import Database, { dbIntance } from '../../database';
import { UserRoleModel } from '../../modal/UserRole';
import { PropertyPType } from '../../modal/PropertyPType';
import { PropertyDType } from '../../modal/PropertyDType';
import { genrateNextId } from '../../commonUtility/commonFunction';
import { AddEditCountryType } from '../../modal/AddEditCountry';
import { AddEditZoneType } from '../../modal/AddEditZone';
import { AddEditStateType } from '../../modal/AddEditState';
import { AddEditCityType } from '../../modal/AddEditCity';
class MasterRepository {
  commonUtility: CommonUtility;
  dbContext: Database;

  constructor() {
    this.commonUtility = new CommonUtility();
    this.dbContext = dbIntance;
  }

  async createAndUpdateUserRole(prm: UserRoleModel['schema'], res: Response) {
    const userRoles = await this.dbContext.find('UserRole', {});
    const lastRole = Math.max(...userRoles.map((item: any) => item.roleId), 0);
    let roleId = lastRole ? lastRole + 1 : 1;
    let { success, error } = await this.dbContext.insert('UserRole', {
      roleName: prm.roleName,
      roleId: roleId,
    });
    if (success) {
      let response = new JsonResponse(
        {},
        `${prm.roleName} Role Added Successfully.`,
      );
      return response.send(res);
    } else {
      let response = new JsonResponse({}, error, 0);
      return response.send(res);
    }
  }

  async addPropertyPType(prm: PropertyPType, res: Response) {
    let id = await genrateNextId(this.dbContext, 'PropertyPType', 'id');
    const { success, error } = await this.dbContext.insert('PropertyPType', {
      id,
      ...prm,
    });
    if (error) {
      return new JsonResponse({}, 'Something went wrong.', 0);
    }
    let response = new JsonResponse(
      success,
      `${prm.name} PropertyPType Added Successfully.`,
      1,
    );
    return response.send(res);
  }
  async addPropertyDType(prm: PropertyDType, res: Response) {
    let id = await genrateNextId(this.dbContext, 'PropertyDType', 'id');
    const { success, error } = await this.dbContext.insert('PropertyDType', {
      id,
      ...prm,
    });
    if (error) {
      return new JsonResponse({}, 'Something went wrong.', 0);
    }
    let response = new JsonResponse(
      success,
      `${prm.name} PropertyDType Added Successfully.`,
      1,
    );
    return response.send(res);
  }

  async addEditCountry(prm: AddEditCountryType, res: Response) {
    if (prm.countryId !== 0) {
      const { acknowledged } = await this.dbContext.update(
        'CountryMaster',
        { countryId: prm.countryId },
        { ...prm },
      );
      if (!acknowledged) {
        return new JsonResponse({}, 'Unable to Update Country.', 0).send(res);
      }
      return new JsonResponse({}, 'Country Name Updated Succesfully.').send(
        res,
      );
    } else {
      let countryId = await genrateNextId(
        this.dbContext,
        'CountryMaster',
        'countryId',
      );
      const { success, error } = await this.dbContext.insert('CountryMaster', {
        ...prm,
        countryId,
      });
      if (error) {
        return new JsonResponse({}, error, 0).send(res);
      }
      return new JsonResponse({ data: success?.at(0) ?? {} }).send(res);
    }
  }
  async addEditZone(prm: AddEditZoneType, res: Response) {
    if (prm.zoneId !== 0) {
      const { acknowledged } = await this.dbContext.update(
        'ZoneMaster',
        { zoneId: prm.zoneId },
        { ...prm },
      );
      if (!acknowledged) {
        return new JsonResponse({}, 'Unable to Update Zone', 0).send(res);
      }
      return new JsonResponse({}, 'Zone Name Updated Succesfully.').send(res);
    } else {
      let zoneId = await genrateNextId(this.dbContext, 'ZoneMaster', 'zoneId');
      const { success, error } = await this.dbContext.insert('ZoneMaster', {
        ...prm,
        zoneId,
      });
      if (error) {
        return new JsonResponse({}, error, 0).send(res);
      }
      return new JsonResponse({ data: success?.at(0) ?? {} }).send(res);
    }
  }
  async addEditState(prm: AddEditStateType, res: Response) {
    if (prm.stateId !== 0) {
      const { acknowledged } = await this.dbContext.update(
        'StateMaster',
        { stateId: prm.stateId },
        { ...prm },
      );
      if (!acknowledged) {
        return new JsonResponse({}, 'Unable to Update State.', 0).send(res);
      }
      return new JsonResponse({}, 'Zone Name Updated Succesfully.').send(res);
    } else {
      let stateId = await genrateNextId(
        this.dbContext,
        'StateMaster',
        'stateId',
      );
      const { success, error } = await this.dbContext.insert('StateMaster', {
        ...prm,
        stateId,
      });
      if (error) {
        return new JsonResponse({}, error, 0).send(res);
      }
      return new JsonResponse({ data: success?.at(0) ?? {} }).send(res);
    }
  }
  async addEditCity(prm: AddEditCityType, res: Response) {
    if (prm.cityId !== 0) {
      const { acknowledged } = await this.dbContext.update(
        'CityMaster',
        { cityId: prm.cityId },
        { ...prm },
      );
      if (!acknowledged) {
        return new JsonResponse({}, 'Something went wrong.', 0).send(res);
      }
      return new JsonResponse({}, 'City Name Updated Succesfully.').send(res);
    } else {
      let cityId = await genrateNextId(this.dbContext, 'CityMaster', 'cityId');
      const { success, error } = await this.dbContext.insert('CityMaster', {
        ...prm,
        cityId,
      });
      if (error) {
        return new JsonResponse({}, 'Something went wrong.', 0).send(res);
      }
      return new JsonResponse({ data: success?.at(0) ?? {} }).send(res);
    }
  }
}
export { MasterRepository };
