import mongoose, { Document, model, Schema } from 'mongoose';
import { PropertyDType } from '../../modal/PropertyDType';

interface IPropertyDType extends PropertyDType, Document {
  id: number;
}

const propertyDTypeTableSchema = new Schema<IPropertyDType>({
  id: { type: Number, required: true, unique: true },
  propertyPId: [{ type: Number, required: true, ref: 'PropertyPType' }],
  name: { type: String, required: true },
});

const PropertyDTypeModel =
  mongoose.models.PropertyDType ||
  model<IPropertyDType>('PropertyDType', propertyDTypeTableSchema);

export { PropertyDTypeModel, IPropertyDType };
