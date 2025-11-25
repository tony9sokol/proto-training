import axios from "axios";
import type { Employee } from "../modules/Employee";

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    const res = await axios.get("http://localhost:3030/api/employees");
    return res.data;
  },
};
