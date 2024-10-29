import 'reflect-metadata';
import { NextFunction, Response } from 'express';
import { CustomerRepository } from '../../../respository/CustomerRepository';
import { CustomerModel, CustomerType } from '../../../modal/CustomerModal';
import {
  ControllerRoute,
  FromBody,
  HttpPost,
  ResponseDecorator,
  Next,
} from 'express-swagger-decorators';

@ControllerRoute('/App/Customer')
class CustomerController {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  @HttpPost('getCustomerList', CustomerModel)
  async userLogin(
    @FromBody() body: CustomerType,
    @ResponseDecorator() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await this.customerRepository.getCustomerList(body, res);
    } catch (error) {
      next(error);
    }
  }
}

export { CustomerController };
