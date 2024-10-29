import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

interface UserRoleSchemaDefinition extends SchemaDefinition {
  roleId: {
    type: 'number';
  };
  roleName: {
    type: 'string';
  };
}

export class UserRoleModel extends BaseModel {
  schema: UserRoleSchemaDefinition = {
    roleId: {
      type: 'number',
    },
    roleName: {
      type: 'string',
    },
  };

  createSchema(): UserRoleModel {
    return new UserRoleModel();
  }
}
