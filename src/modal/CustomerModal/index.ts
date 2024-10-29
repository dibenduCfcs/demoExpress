import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

interface CustomerModelSchemaDefinition extends SchemaDefinition {
  paging: {
    type: 'object';
    properties: {
      pageNo: { type: 'number' };
      pageSize: { type: 'number' };
    };
  };
  search: {
    type: 'string';
  };
  loi: {
    type: 'array';
    items: {
      type: 'number';
    };
  };
  sort: {
    type: 'number';
  };
}

export interface CustomerType {
  paging: {
    pageNo: number;
    pageSize: number;
  };
  loi: number[];
  search: string;
  sort: number;
}

export class CustomerModel extends BaseModel {
  schema: CustomerModelSchemaDefinition = {
    paging: {
      type: 'object',
      properties: {
        pageNo: { type: 'number' },
        pageSize: { type: 'number' },
      },
    },
    search: {
      type: 'string',
    },
    loi: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    sort: {
      type: 'number',
    },
  };

  createSchema(): CustomerModel {
    return new CustomerModel();
  }
}
