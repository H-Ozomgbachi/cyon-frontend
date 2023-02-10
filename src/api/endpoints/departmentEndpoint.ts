import requests from "../main/apiConfig";
import { DepartmentModel } from "../models/department";

export const Department = {
  getDepartments: () => requests.get<DepartmentModel[]>("/departments"),
};
