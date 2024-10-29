import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

export interface AddEditCountryType {
  countryId: number;
  countryName: string;
}

interface AddEditCountrySchemaDefinition extends SchemaDefinition {
  countryId: { type: 'number' };
  countryName: { type: 'string' };
}

export class AddEditCountryModel extends BaseModel {
  schema: AddEditCountrySchemaDefinition = {
    countryId: { type: 'number' },
    countryName: { type: 'string' },
  };

  createSchema(): AddEditCountryModel {
    return new AddEditCountryModel();
  }
}
