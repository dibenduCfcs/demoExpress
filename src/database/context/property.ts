import mongoose, { Document, model, Schema } from 'mongoose';
import { AddPropertyType } from '../../modal/AddProperty';

interface IProperty extends AddPropertyType, Document {
  propertyId: number;
}

const propertyTableSchema = new Schema<IProperty>({
  propertyId: { type: Number, required: true, unique: true },
  propertyName: { type: String, required: true },
  propertyPType: { type: Number, required: true },
  lookingTo: { type: Number, required: true },
  propertyDType: { type: Number, required: true },
  coords: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  state: { type: Number, required: true },
  city: { type: Number, required: true },
  buildingInfo: { type: String, required: true },
  locality: { type: String, required: true },
  bhk: { type: Number, required: true },
  buildUpArea: { type: String, required: true },
  furnishType: { type: Number, required: true },
  shareAgent: { type: Number, required: true },
  cost: { type: Number, required: true },
  constructionStatus: { type: Number, required: true },
  propertZone: { type: Number, required: true },
  locationHub: { type: Number, required: true },
  propertyCondition: { type: Number, required: true },
  onwership: { type: Number, required: true },
  negotiable: { type: Number, required: true },
  tax: { type: Number, required: true },
  dg_ups: { type: Number, required: true },
  totalFloor: { type: Number, required: true },
  availableFloor: { type: [Number], required: true },
  noOfStair: { type: String, required: true },
  passengerLift: { type: String, required: true },
  serviceLift: { type: String, required: true },
  privateParking: { type: String, required: true },
  publicParking: { type: String, required: true },
});

const PropertyModel =
  mongoose.models.Property || model<IProperty>('Property', propertyTableSchema);

export { PropertyModel, IProperty };
