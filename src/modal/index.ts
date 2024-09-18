import { BaseModel, SchemaDefinition } from "./BaseModal";
import { UserLoginModel } from "./UserLoginModal";
import { UserModel } from "./UserModal";

class Model {

    modelSchemas:{[key:string]:{
        type:'object'|'string'|'number',
        properties:SchemaDefinition,
        required?:string[]
    }}

    constructor(){
      this.modelSchemas = {};
    }

    addNewModel(schema:SchemaDefinition, modelName:string){
        this.modelSchemas = {
            ...this.modelSchemas,
            [modelName]: {
                type: 'object',
                properties:schema
            }
        }
    }

    registerSchemas<T extends BaseModel>(Modals:(new ()=> T)[]){
        Modals.forEach((modal) => {
            let modelInstance = new modal();
            this.addNewModel(modelInstance.getModalSchema(), modal.name);
        })
    }
}


const modelInstance = new Model();
modelInstance.registerSchemas([UserModel,UserLoginModel])
const schemas = modelInstance.modelSchemas
export {Model, schemas}