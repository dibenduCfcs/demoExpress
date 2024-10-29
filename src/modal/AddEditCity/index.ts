import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

export interface AddEditCityType {
  stateId: number;
  cityId: number;
  cityName: string;
}

interface AddEditCitySchemaDefinition extends SchemaDefinition {
  stateId: { type: 'number' };
  cityId: { type: 'number' };
  cityName: { type: 'string' };
}

export class AddEditCityModel extends BaseModel {
  schema: AddEditCitySchemaDefinition = {
    stateId: { type: 'number' },
    cityId: { type: 'number' },
    cityName: { type: 'string' },
  };

  createSchema(): AddEditCityModel {
    return new AddEditCityModel();
  }
}
