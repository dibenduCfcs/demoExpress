import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

interface UserSchemaDefinition extends SchemaDefinition {
  name: {
    type: 'string';
  };
  email: {
    type: 'string';
  };
  mobile: {
    type: 'number';
  };
  password: {
    type: 'string';
  };
  roleId: {
    type: 'number';
  };
}

export class UserModel extends BaseModel {
  schema: UserSchemaDefinition = {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    mobile: {
      type: 'number',
    },
    password: {
      type: 'string',
    },
    roleId: {
      type: 'number',
    },
  };

  createSchema(): UserModel {
    return new UserModel();
  }
}
