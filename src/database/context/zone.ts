import mongoose, { Document, model, Schema } from 'mongoose';
import { AddEditZoneType } from '../../modal/AddEditZone';

interface IZoneType extends AddEditZoneType, Document {
  zoneId: number;
}

const tableSchema = new Schema<IZoneType>({
  zoneId: { type: Number, required: true, unique: true },
  zoneName: { type: String, required: true },
});

const ZoneMasterModel =
  mongoose.models.ZoneMaster || model<IZoneType>('ZoneMaster', tableSchema);

export { ZoneMasterModel, IZoneType };
