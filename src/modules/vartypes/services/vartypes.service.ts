import { ErrorHandler } from "@middlewares/error_handler";
import { GenericData } from "@models/any.model";
import VarTypes, { IVarType } from "@models/varTypes.model"

const dataCheck = data=>{
  data.selections = data.type == 'selection'?data.selections:[]
  return data
}

export class VartypesService {
  async findOne(name: string): Promise<Object> {
    try {
      const foundData = await VarTypes.findOne({ name });

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
      const allData = await VarTypes.find();
      return allData;
    } catch (error) {
      return new ErrorHandler(400, '查詢所有資料時發生錯誤。', { error });
    }
  }

  async update(name: string, body: IVarType): Promise<Object> {
    try {
      const updatedVarType = await VarTypes.findOneAndUpdate(
        { name },
        dataCheck(body),
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

  async store(body: IVarType | IVarType[]): Promise<Object> {
    try {
      body = dataCheck(body)
      const createdData = Array.isArray(body)?
      await VarTypes.insertMany(body):
      await VarTypes.create(body);
      return createdData;
    } catch (error) {
      return new ErrorHandler(400, '儲存資料時發生錯誤。', { error });
    }
  }

  async destroy(name: string): Promise<Object> {
    try {
      const deletedData = await VarTypes.findOneAndDelete({ name });

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
