import { Schema, model, Document } from 'mongoose';

export interface IVarType extends Document {
  name: string,
  type: string
  selections?: (string | number)[]
}

const varTypeSchema = new Schema<IVarType>({
  name: { type: String, required: true, unique: true },
  type: {
    type: String, required: true,
    enum: ['string', 'number', 'url', 'selection']
  },
  selections: [{ type: Schema.Types.Mixed }]
})

const VarTypes = model<IVarType>('varTypes', varTypeSchema);

export default VarTypes;
