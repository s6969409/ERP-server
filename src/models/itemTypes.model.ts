import { Schema, model, Document } from 'mongoose';

export interface IItemType extends Document {
  name: string,
  vars: string[]
}

const itemTypeSchema = new Schema<IItemType>({
  name: { type: String, required: true, unique: true },
  vars: [{ type: String, required: true }]
})

const ItemTypes = model<IItemType>('itemTypes', itemTypeSchema);

export default ItemTypes;