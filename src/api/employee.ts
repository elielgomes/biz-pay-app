import { IEmployee, ILoginUserRequest, IUser, ILoginUserResponse, IEmployeeDTO } from "@/interfaces";
import { axiosApi } from "@/services/api";
import axios from "axios";

export class Employee {

  async getUserByToken(token: string): Promise<IUser> {
    return await axiosApi.get(`/employee/token/${token}`)
      .then(response => response.data);
  }

  async authenticateUser({ Email, Password }: ILoginUserRequest): Promise<ILoginUserResponse> {
    const response = await axiosApi.post('/login', {
      Email: Email,
      Password: Password,
    });
    return response.data;
  }

  async getAllEmployees(): Promise<IEmployee[]> {
    return await axiosApi.get('/employee')
      .then(response => response.data);
  }

  async getEmployeeByCpf(cpf: string): Promise<IEmployee> {
    return await axiosApi.get(`/employee/${cpf}`)
      .then(response => response.data);
  }

  async updateEmployee(employee: IEmployeeDTO) {
   await axiosApi.patch(`/employee`, employee);
  }
  async createEmployee(employee: IEmployee) {
    await axiosApi.post(`/employee`, employee);
  }

}