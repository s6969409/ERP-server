import { Document, Schema, model } from "mongoose";

// 定義通用的資料結構
interface IGenericData extends Document {
  [key: string]: any;
}

const genericDataSchema = new Schema<any>({
  data: { type: Schema.Types.Mixed, required: true }
});

export const GenericData = model<IGenericData>('GenericData', genericDataSchema);