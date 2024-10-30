import { Response } from 'express';
import { JsonResponse } from '../../class/response';
import { CommonUtility } from 'express-swagger-decorators';
import Database, { dbIntance } from '../../database';
import { CustomerType } from '../../modal/CustomerModal';
import { AddEditCountryType } from '../../modal/AddEditCountry';
import { AddEditZoneType } from '../../modal/AddEditZone';
import { AddEditStateType } from '../../modal/AddEditState';
import { AddEditCityType } from '../../modal/AddEditCity';

class DropDownRepository {
  commonUtility: CommonUtility;
  dbContext: Database;

  constructor() {
    this.commonUtility = new CommonUtility();
    this.dbContext = dbIntance;
  }

  async getCountryList(res: Response) {
    const list: AddEditCountryType[] = await this.dbContext.find(
      'CountryMaster',
      {},
    );
    const countryList = list.map((item) => ({
      countryId: item.countryId,
      countryName: item.countryName,
    }));

    let response = new JsonResponse(
      countryList,
      'Country List Fetched Successfully.',
      1,
    );
    return response.send(res);
  }
  async getZoneList(res: Response) {
    const list: AddEditZoneType[] = await this.dbContext.find('ZoneMaster', {});
    const zoneList = list.map((item) => ({
      zoneId: item.zoneId,
      zoneName: item.zoneName,
    }));

    let response = new JsonResponse(
      zoneList,
      'Zone List Fetched Successfully.',
      1,
    );
    return response.send(res);
  }
  async getStateList(countryId: number, zoneId: number, res: Response) {
    let query = zoneId === 0 ? { countryId } : { countryId, zoneId };
    const list: AddEditStateType[] = await this.dbContext.find(
      'StateMaster',
      query,
    );
    const stateList = list.map((item) => ({
      stateId: item.stateId,
      stateName: item.stateName,
    }));

    let response = new JsonResponse(
      stateList,
      'State List Fetched Successfully.',
      1,
    );
    return response.send(res);
  }
  async getCityList(stateId: number, res: Response) {
    const list: AddEditCityType[] = await this.dbContext.find('CityMaster', {
      stateId,
    });
    const cityList = list.map((item) => ({
      cityId: item.cityId,
      cityName: item.cityName,
    }));

    let response = new JsonResponse(
      cityList,
      'City List Fetched Successfully.',
      1,
    );
    return response.send(res);
  }
}
export { DropDownRepository };
