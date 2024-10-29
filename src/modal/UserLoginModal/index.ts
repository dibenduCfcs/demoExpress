import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

interface UserLoginSchema extends SchemaDefinition {
  email: {
    type: 'string';
  };
  password: {
    type: 'string';
  };
}

export class UserLoginModel extends BaseModel {
  schema: UserLoginSchema = {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  };

  createSchema(): UserLoginModel {
    return new UserLoginModel();
  }
}
