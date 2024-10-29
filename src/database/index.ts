import { AbstractDatabase, DbContext } from 'express-swagger-decorators';

class Database extends AbstractDatabase {
  constructor() {
    super();
    this.connectionString = 'mongodb://localhost:27017/RealTimeChat';
    this.context = new DbContext();
  }
}

export const dbIntance = new Database();
export default Database;
