import { BaseModel, SchemaDefinition } from "../BaseModal";

export class UserLoginModel extends BaseModel {
     schema:SchemaDefinition = {
        mobile:{
            type: 'number'
        }
    };

    createSchema(): UserLoginModel {
        return new UserLoginModel();
    }
}

 