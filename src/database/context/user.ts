import mongoose, { Document, model, Schema } from 'mongoose';
import { IRole } from './role';

interface IUser extends Document {
  name: string;
  email: string;
  mobile: number;
  image?: string;
  password: string;
  loginHash?: string;
  roleId: IRole;
}

const userTableSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, unique: true },
  image: { type: String, required: false },
  password: { type: String, required: true },
  loginHash: { type: String, required: false },
  roleId: { type: Number, ref: 'UserRole', required: true },
});

const UserModel = mongoose.models.User || model<IUser>('User', userTableSchema);

export { UserModel, IUser };
