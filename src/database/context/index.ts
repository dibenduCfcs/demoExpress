import { CityMasterModel } from './city';
import { CountryMasterModel } from './country';
import { PropertyModel } from './property';
import { PropertyDTypeModel } from './propertyDType';
import { PropertyPTypeModel } from './propertyPType';
import { UserRoleModel } from './role';
import { StateMasterModel } from './state';
import { UserModel } from './user';
import { ZoneMasterModel } from './zone';

const tableSchemas = [
  UserRoleModel,
  UserModel,
  PropertyModel,
  PropertyPTypeModel,
  PropertyDTypeModel,
  CountryMasterModel,
  StateMasterModel,
  ZoneMasterModel,
  CityMasterModel,
];
export { tableSchemas };
