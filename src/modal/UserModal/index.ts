import { BaseModel, SchemaDefinition } from '../BaseModal';

export class UserModel extends BaseModel {
  schema: SchemaDefinition = {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    mobile: {
      type: 'number',
    },
  };

  createSchema(): UserModel {
    return new UserModel();
  }
}
