// If there is a base structure for all the models it can be implemented here to avoid repeat in code.

export interface BaseModelFields {
  is_deleted?: boolean;
  created_at?: string;
  modified_at?: string;
}
export interface BaseModelObj<T extends BaseModelFields = BaseModelFields> {
  model: string;
  pk: string;
  fields: T;
}
class BaseModel<T extends BaseModelFields = BaseModelFields> {
  readonly model!: string;
  pk!: string;
  fields!: BaseModelFields & T;

  constructor(obj: BaseModelObj<T>) {
    Object.assign(this, obj);
  }
}

const exportModule = {
  BaseModel
};
export default exportModule;
