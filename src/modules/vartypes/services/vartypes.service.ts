import { ErrorHandler } from "@middlewares/error_handler";
import { Model } from "mongoose";

export class MongoDBBaseService<T> {
  protected model:Model<T>
  constructor(model:Model<T>){this.model = model}
  async findOne(name: string): Promise<Object> {
    try {
      const foundData = await this.model.findOne({ name });

      if (foundData) {
        return foundData;
      } else {
        return new ErrorHandler(400, '找不到符合條件的資料。');
      }
    } catch (error) {
      return new ErrorHandler(400, '查詢資料時發生錯誤。', { error });
    }
  }

  async findAll(): Promise<ErrorHandler | Object> {
    try {
      const allData = await this.model.find();
      return allData;
    } catch (error) {
      return new ErrorHandler(400, '查詢所有資料時發生錯誤。', { error });
    }
  }

  async update(name: string, body): Promise<Object> {
    try {
      const updatedVarType = await this.model.findOneAndUpdate(
        { name },
        body,
        { new: true }
      );

      if (updatedVarType) {
        return updatedVarType;
      } else {
        return new ErrorHandler(400, '找不到符合條件的資料。');
      }
    } catch (error) {
      return new ErrorHandler(400, '更新資料時發生錯誤。', { error });
    }
  }

  async store(body: T | T[]): Promise<Object> {
    try {
      const createdData = Array.isArray(body)?
      await this.model.insertMany(body):
      await this.model.create(body);
      return createdData;
    } catch (error) {
      return new ErrorHandler(400, '儲存資料時發生錯誤。', { error });
    }
  }

  async destroy(name: string): Promise<Object> {
    try {
      const deletedData = await this.model.findOneAndDelete({ name });

      if (deletedData) {
        return deletedData;
      } else {
        return new ErrorHandler(400, '找不到符合條件的資料。');
      }
    } catch (error) {
      return new ErrorHandler(400, '刪除資料時發生錯誤。', { error });
    }
  }
}
