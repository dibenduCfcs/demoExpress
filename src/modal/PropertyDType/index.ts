import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

export interface PropertyDType {
  name: string;
  propertyPId: number[];
}

interface PropertyDTypeSchemaDefinition extends SchemaDefinition {
  name: { type: 'string' };
  propertyPId: { type: 'array'; items: { type: 'number' } };
}

export class PropertyDTypeModel extends BaseModel {
  schema: PropertyDTypeSchemaDefinition = {
    name: { type: 'string' },
    propertyPId: { type: 'array', items: { type: 'number' } },
  };

  createSchema(): PropertyDTypeModel {
    return new PropertyDTypeModel();
  }
}
