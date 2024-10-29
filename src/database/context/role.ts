import mongoose, { Document, model, Schema } from 'mongoose';

interface IRole extends Document {
  roleId: number;
  roleName: string;
}

const roleTableSchema = new Schema<IRole>({
  roleName: { type: String, required: true, unique: true },
  roleId: { type: Number, required: true, unique: true },
});

const UserRoleModel =
  mongoose.models.UserRole || model<IRole>('UserRole', roleTableSchema);

export { UserRoleModel, IRole };
