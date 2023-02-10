import { makeAutoObservable, runInAction } from "mobx";
import { SelectOptionModel } from "../../components/shared/models/selectOptionModel";
import agent from "../main/apiAgent";

export class DepartmentStore {
  departments: SelectOptionModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getDepartments = async () => {
    try {
      const result = await agent.department.getDepartments();

      runInAction(() => {
        this.departments = result.map((el) => {
          return {
            text: el.name,
            value: el.id,
          };
        });
      });
    } catch (error) {
      throw error;
    }
  };
}
