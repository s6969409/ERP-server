import { ErrorHandler } from "@middlewares/error_handler";
import VarTypes from "@models/varTypes.model";

export const ItemVarCheckFunc = async item => {
  const varNames = await (await VarTypes.find()).map(vt => vt.name)
  const isFailed = item.vars.every(v => !varNames.includes(v));
  return isFailed ? new ErrorHandler(400, '資料結構錯誤。') : item;
}