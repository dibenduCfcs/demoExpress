import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

export interface PropertyPType {
  name: string;
}

interface PropertyPTypeSchemaDefinition extends SchemaDefinition {
  name: { type: 'string' };
}

export class PropertyPTypeModel extends BaseModel {
  schema: PropertyPTypeSchemaDefinition = {
    name: { type: 'string' },
  };

  createSchema(): PropertyPTypeModel {
    return new PropertyPTypeModel();
  }
}
