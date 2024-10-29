import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

export interface AddEditZoneType {
  zoneId: number;
  zoneName: string;
}

interface AddEditZoneSchemaDefinition extends SchemaDefinition {
  zoneId: { type: 'number' };
  zoneName: { type: 'string' };
}

export class AddEditZoneModel extends BaseModel {
  schema: AddEditZoneSchemaDefinition = {
    zoneId: { type: 'number' },
    zoneName: { type: 'string' },
  };

  createSchema(): AddEditZoneModel {
    return new AddEditZoneModel();
  }
}
