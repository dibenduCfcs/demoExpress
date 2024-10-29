import { NextFunction, Response } from 'express';
import {
  Authenticate,
  ControllerRoute,
  FromBody,
  HttpPost,
  Next,
  ResponseDecorator,
} from 'express-swagger-decorators';
import { UserRoleModel } from '../../../modal/UserRole';
import { MasterRepository } from '../../../respository/MasterRepository';
import {
  PropertyPType,
  PropertyPTypeModel,
} from '../../../modal/PropertyPType';
import {
  PropertyDType,
  PropertyDTypeModel,
} from '../../../modal/PropertyDType';
import {
  AddEditCountryModel,
  AddEditCountryType,
} from '../../../modal/AddEditCountry';
import { JsonResponse } from '../../../class/response';
import {
  AddEditStateModel,
  AddEditStateType,
} from '../../../modal/AddEditState';
import { AddEditZoneModel, AddEditZoneType } from '../../../modal/AddEditZone';
import { AddEditCityModel, AddEditCityType } from '../../../modal/AddEditCity';

@ControllerRoute('/Admin/Master')
class MasterController {
  private readonly masterRepository: MasterRepository;

  constructor() {
    this.masterRepository = new MasterRepository();
  }

  @HttpPost('createAndUpdateUserRole', UserRoleModel)
  @Authenticate()
  async createNewUser(
    @FromBody() body: UserRoleModel['schema'],
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.masterRepository.createAndUpdateUserRole(body, res);
    } catch (error) {
      next(error);
    }
  }
  @HttpPost('addPropertyPType', PropertyPTypeModel)
  @Authenticate()
  async addPropertyPType(
    @FromBody() body: PropertyPType,
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.masterRepository.addPropertyPType(body, res);
    } catch (error) {
      next(error);
    }
  }
  @HttpPost('addPropertyDType', PropertyDTypeModel)
  @Authenticate()
  async addPropertyDType(
    @FromBody() body: PropertyDType,
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.masterRepository.addPropertyDType(body, res);
    } catch (error) {
      next(error);
    }
  }
  @HttpPost('addEditCountry', AddEditCountryModel)
  @Authenticate()
  async addEditCountry(
    @FromBody() body: AddEditCountryType,
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.masterRepository.addEditCountry(body, res);
    } catch (error) {
      next(error);
    }
  }
  @HttpPost('addEditState', AddEditStateModel)
  @Authenticate()
  async addEditState(
    @FromBody() body: AddEditStateType,
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.masterRepository.addEditState(body, res);
    } catch (error) {
      next(error);
    }
  }
  @HttpPost('addEditZone', AddEditZoneModel)
  @Authenticate()
  async addEditZone(
    @FromBody() body: AddEditZoneType,
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.masterRepository.addEditZone(body, res);
    } catch (error) {
      next(error);
    }
  }
  @HttpPost('addEditCity', AddEditCityModel)
  @Authenticate()
  async addEditCity(
    @FromBody() body: AddEditCityType,
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.masterRepository.addEditCity(body, res);
    } catch (error) {
      next(error);
    }
  }
}

export { MasterController };
