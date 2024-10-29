import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

export interface AddEditStateType {
  countryId: number;
  zoneId: number;
  stateId: number;
  stateName: string;
}

interface AddEditStateSchemaDefinition extends SchemaDefinition {
  countryId: { type: 'number' };
  zoneId: { type: 'number' };
  stateId: { type: 'number' };
  stateName: { type: 'string' };
}

export class AddEditStateModel extends BaseModel {
  schema: AddEditStateSchemaDefinition = {
    countryId: { type: 'number' },
    zoneId: { type: 'number' },
    stateId: { type: 'number' },
    stateName: { type: 'string' },
  };

  createSchema(): AddEditStateModel {
    return new AddEditStateModel();
  }
}
