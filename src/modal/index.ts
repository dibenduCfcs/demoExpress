import { Model } from 'express-swagger-decorators';
import { UserLoginModel } from './UserLoginModal';
import { UserModel } from './UserModal';
import { UserRoleModel } from './UserRole';
import { CustomerModel } from './CustomerModal';
import { AddEditCountryModel } from './AddEditCountry';
import { AddEditStateModel } from './AddEditState';
import { AddEditZoneModel } from './AddEditZone';
import { AddEditCityModel } from './AddEditCity';

const modelInstance = new Model();
modelInstance.registerSchemas([
  UserModel,
  UserLoginModel,
  UserRoleModel,
  CustomerModel,
  AddEditCountryModel,
  AddEditStateModel,
  AddEditZoneModel,
  AddEditCityModel,
]);
const schemas = modelInstance.modelSchemas;
export { Model, schemas };
