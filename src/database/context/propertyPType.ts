import mongoose, { Document, model, Schema } from 'mongoose';
import { PropertyPType } from '../../modal/PropertyPType';

interface IPropertyPType extends PropertyPType, Document {
  id: number;
}

const propertyPTypeTableSchema = new Schema<IPropertyPType>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

const PropertyPTypeModel =
  mongoose.models.PropertyPType ||
  model<IPropertyPType>('PropertyPType', propertyPTypeTableSchema);

export { PropertyPTypeModel, IPropertyPType };
