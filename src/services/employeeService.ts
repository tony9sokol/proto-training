import axios from "axios";
import type { Employee } from "../modules/Employee";
import { EMPLOYEES_API_URL } from "../config/api";

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await axios.get(EMPLOYEES_API_URL);
  return res.data;
};

export const employeeService = {
  getEmployees,
};
