import mongoose, { Document, model, Schema } from 'mongoose';
import { AddEditStateType } from '../../modal/AddEditState';

interface IStateType extends AddEditStateType, Document {
  stateId: number;
}

const tableSchema = new Schema<IStateType>({
  stateId: { type: Number, required: true, unique: true },
  countryId: { type: Number, required: true },
  zoneId: { type: Number, required: true },
  stateName: { type: String, required: true },
});

const StateMasterModel =
  mongoose.models.StateMasterModel ||
  model<IStateType>('StateMaster', tableSchema);

export { StateMasterModel, IStateType };
