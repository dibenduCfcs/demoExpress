import mongoose, { Document, model, Schema } from 'mongoose';
import { AddEditCityType } from '../../modal/AddEditCity';

interface ICityType extends AddEditCityType, Document {
  cityId: number;
}

const tableSchema = new Schema<ICityType>({
  stateId: { type: Number, required: true, unique: true },
  cityId: { type: Number, required: true },
  cityName: { type: String, required: true },
});

const CityMasterModel =
  mongoose.models.CityMasterModel ||
  model<ICityType>('CityMaster', tableSchema);

export { CityMasterModel, ICityType };
