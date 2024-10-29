import { BaseModel, SchemaDefinition } from 'express-swagger-decorators';

export interface AddPropertyType {
  propertyName: string;
  propertyPType: number;
  lookingTo: number;
  propertyDType: number;
  coords: {
    latitude: string;
    longitude: string;
  };
  state: number;
  city: number;
  buildingInfo: string;
  locality: string;
  bhk: number;
  buildUpArea: string;
  furnishType: number;
  shareAgent: number;
  cost: number;
  constructionStatus: number;
  propertZone: number;
  locationHub: number;
  propertyCondition: number;
  onwership: number;
  negotiable: number;
  tax: number;
  dg_ups: number;
  totalFloor: number;
  availableFloor: number[];
  noOfStair: string;
  passengerLift: string;
  serviceLift: string;
  privateParking: string;
  publicParking: string;
}

interface AddPropertySchemaDefinition extends SchemaDefinition {
  propertyName: {
    type: 'string';
  };
  propertyPType: { type: 'number' };
  lookingTo: { type: 'number' };
  propertyDType: { type: 'number' };
  coords: {
    type: 'object';
    properties: {
      latitude: { type: 'string' };
      longitude: { type: 'string' };
    };
  };
  state: { type: 'number' };
  city: { type: 'number' };
  buildingInfo: { type: 'string' };
  locality: { type: 'string' };
  bhk: { type: 'number' };
  buildUpArea: { type: 'string' };
  furnishType: { type: 'number' };
  shareAgent: { type: 'number' };
  cost: { type: 'number' };
  constructionStatus: { type: 'number' };
  propertZone: { type: 'number' };
  locationHub: { type: 'number' };
  propertyCondition: { type: 'number' };
  onwership: { type: 'number' };
  negotiable: { type: 'number' };
  tax: { type: 'number' };
  dg_ups: { type: 'number' };
  totalFloor: { type: 'number' };
  availableFloor: { type: 'array'; items: { type: 'number' } };
  noOfStair: { type: 'string' };
  passengerLift: { type: 'string' };
  serviceLift: { type: 'string' };
  privateParking: { type: 'string' };
  publicParking: { type: 'string' };
}

export class AddPropertyModel extends BaseModel {
  schema: AddPropertySchemaDefinition = {
    propertyName: {
      type: 'string',
    },
    propertyPType: { type: 'number' },
    lookingTo: { type: 'number' },
    propertyDType: { type: 'number' },
    coords: {
      type: 'object',
      properties: {
        latitude: { type: 'string' },
        longitude: { type: 'string' },
      },
    },
    state: { type: 'number' },
    city: { type: 'number' },
    buildingInfo: { type: 'string' },
    locality: { type: 'string' },
    bhk: { type: 'number' },
    buildUpArea: { type: 'string' },
    furnishType: { type: 'number' },
    shareAgent: { type: 'number' },
    cost: { type: 'number' },
    constructionStatus: { type: 'number' },
    propertZone: { type: 'number' },
    locationHub: { type: 'number' },
    propertyCondition: { type: 'number' },
    onwership: { type: 'number' },
    negotiable: { type: 'number' },
    tax: { type: 'number' },
    dg_ups: { type: 'number' },
    totalFloor: { type: 'number' },
    availableFloor: { type: 'array', items: { type: 'number' } },
    noOfStair: { type: 'string' },
    passengerLift: { type: 'string' },
    serviceLift: { type: 'string' },
    privateParking: { type: 'string' },
    publicParking: { type: 'string' },
  };

  createSchema(): AddPropertyModel {
    return new AddPropertyModel();
  }
}
