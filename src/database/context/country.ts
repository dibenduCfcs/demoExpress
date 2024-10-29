import mongoose, { Document, model, Schema } from 'mongoose';
import { AddEditCountryType } from '../../modal/AddEditCountry';

interface ICountryType extends AddEditCountryType, Document {
  countryId: number;
}

const tableSchema = new Schema<ICountryType>({
  countryId: { type: Number, required: true, unique: true },
  countryName: { type: String, required: true, unique: true },
});

const CountryMasterModel =
  mongoose.models.CountryMaster ||
  model<ICountryType>('CountryMaster', tableSchema);

export { CountryMasterModel, ICountryType };
