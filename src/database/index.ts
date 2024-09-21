import mongoose from 'mongoose';
import { DbContext } from './context';

class Database {
  private connectionString: string;
  context: DbContext;
  constructor() {
    this.connectionString = 'mongodb://localhost:27017'; // Connection string with database name
    this.context = new DbContext();
  }

  // Method to connect to MongoDB
  async connect() {
    try {
      await mongoose.connect(this.connectionString, { dbName: 'MyDB' });
      console.log('Connected to MongoDB successfully');
    } catch (error: any) {
      console.error('Error connecting to MongoDB:', error.message);
      throw error;
    }
  }

  // Method to disconnect from MongoDB
  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error: any) {
      console.error('Error disconnecting from MongoDB:', error.message);
      throw error;
    }
  }

  // Generic method to find documents in a collection
  async find(collectionName: string, query = {}) {
    let collection = this.context.getCollection(collectionName);
    return await mongoose.model(collectionName, collection.schema).find(query);
  }

  // Generic method to insert a document into a collection
  async insert(collectionName: string, data: any) {
    let collection = this.context.getCollection(collectionName);
    try {
      return await mongoose
        .model(collectionName, collection.schema)
        .insertMany([data]);
    } catch (error) {
      throw error;
    }
  }

  //   // Generic method to update documents in a collection
  //   async update(collection, filter, updateData) {
  //     try {
  //       const result = await mongoose
  //         .model(collection)
  //         .updateMany(filter, updateData);
  //       return result;
  //     } catch (error) {
  //       console.error(
  //         `Error updating documents in ${collection}:`,
  //         error.message,
  //       );
  //       throw error;
  //     }
  //   }

  //   // Generic method to delete documents in a collection
  //   async delete(collection, query) {
  //     try {
  //       const result = await mongoose.model(collection).deleteMany(query);
  //       return result;
  //     } catch (error) {
  //       console.error(
  //         `Error deleting documents from ${collection}:`,
  //         error.message,
  //       );
  //       throw error;
  //     }
  //   }
}

export default Database;
