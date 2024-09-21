import { UserModel } from './user';

class DbContext {
  models: any[];
  constructor() {
    this.models = [UserModel];
  }

  getCollection(collectionName: string) {
    return this.models
      .filter((model) => model.modelName === collectionName)
      .at(0);
  }
}
export { DbContext };
