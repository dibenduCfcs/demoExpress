import mongoose from 'mongoose';

let { Schema, model } = mongoose;

let schema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, unique: true },
};

let userSchema = new Schema(schema);

let UserModel = model('User', userSchema);
UserModel.schema

export { UserModel };
