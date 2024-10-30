import 'reflect-metadata';
import { NextFunction, Response } from 'express';
import {
  ControllerRoute,
  ResponseDecorator,
  Next,
  HttpGet,
  FromRoute,
} from 'express-swagger-decorators';
import { JsonResponse } from '../../../class/response';
import { DropDownRepository } from '../../../respository/DropDownRespository';

@ControllerRoute('/DropDown')
class DropDownController {
  private dropDownRepository: DropDownRepository;

  constructor() {
    this.dropDownRepository = new DropDownRepository();
  }

  @HttpGet('getCountryList')
  async getCountryList(
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.dropDownRepository.getCountryList(res);
    } catch (error) {
      next(error);
    }
  }
  @HttpGet('getZoneList')
  async getZoneList(
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.dropDownRepository.getZoneList(res);
    } catch (error) {
      next(error);
    }
  }
  @HttpGet('getStateList/:countryId')
  async getStateList(
    @FromRoute() id: { countryId: number; zoneId: number },
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.dropDownRepository.getStateList(
        id.countryId,
        id.zoneId ?? 0,
        res,
      );
    } catch (error) {
      next(error);
    }
  }
  @HttpGet('getCityList/:stateId')
  async getCityList(
    @FromRoute() id: { stateId: number },
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.dropDownRepository.getCityList(id.stateId, res);
    } catch (error) {
      next(error);
    }
  }
}

export { DropDownController };
