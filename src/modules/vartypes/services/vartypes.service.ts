import { ErrorHandler } from "@middlewares/error_handler";
import { Model } from "mongoose";

export class MongoDBBaseService<T> {
  protected model: Model<T>
  protected validator
  protected FCa: Promise<T>
  constructor(model: Model<T>, validator = data => data) {
    this.model = model
    this.validator = validator
  }
  findOne = async (name: string): Promise<Object> => {
    try {
      const foundData = await this.model.findOne({ name });

      if (foundData) {
        return foundData;
      } else {
        return new ErrorHandler(400, '找不到符合條件的資料。');
      }
    } catch (error: any) {
      return new ErrorHandler(400, '查詢資料時發生錯誤。', { name: error.name, message: error.message });
    }
  }

  findAll = async (): Promise<ErrorHandler | Object> => {
    try {
      const allData = await this.model.find();
      return allData;
    } catch (error: any) {
      return new ErrorHandler(400, '查詢所有資料時發生錯誤。', { name: error.name, message: error.message });
    }
  }

  update = async (body): Promise<Object> => {
    try {
      const data = await this.validator(body)
      if (data instanceof Error) return data;
      const updatedData = await this.model.findOneAndUpdate(
        { name: body.name },
        data,
        { new: true }
      );

      if (updatedData) {
        return updatedData;
      } else {
        return new ErrorHandler(400, '找不到符合條件的資料。');
      }
    } catch (error: any) {
      return new ErrorHandler(400, '更新資料時發生錯誤。', { name: error.name, message: error.message });
    }
  }

  store = async (body: T | T[]): Promise<Object> => {
    try {
      if (Array.isArray(body)) {
        const data = body.map(t => this.validator(t))
        return await this.model.insertMany(data)
      } else {
        const data = await this.validator(body)
        return await this.model.create(data);
      }
    } catch (error: any) {
      return new ErrorHandler(400, '儲存資料時發生錯誤。', { name: error.name, message: error.message });
    }
  }

  destroy = async (name: string): Promise<Object> => {
    try {
      const deletedData = await this.model.findOneAndDelete({ name });

      if (deletedData) {
        return deletedData;
      } else {
        return new ErrorHandler(400, '找不到符合條件的資料。');
      }
    } catch (error: any) {
      return new ErrorHandler(400, '刪除資料時發生錯誤。', { name: error.name, message: error.message });
    }
  }
}
