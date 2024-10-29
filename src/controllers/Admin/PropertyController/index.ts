import { NextFunction, Response } from 'express';
import {
  ControllerRoute,
  FromBody,
  HttpPost,
  Next,
  ResponseDecorator,
} from 'express-swagger-decorators';
import { PropertyRepository } from '../../../respository/PropertyRepository';
import { AddPropertyModel, AddPropertyType } from '../../../modal/AddProperty';

@ControllerRoute('/Admin/Property')
class PropertyController {
  private readonly propertyRepository: PropertyRepository;

  constructor() {
    this.propertyRepository = new PropertyRepository();
  }

  @HttpPost('addNewProperty', AddPropertyModel)
  async addNewProperty(
    @FromBody() body: AddPropertyType,
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.propertyRepository.addNewProperty(body, res);
    } catch (error) {
      next(error);
    }
  }
}

export { PropertyController };
