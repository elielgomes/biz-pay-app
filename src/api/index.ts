import { IEmployee, ILoginUserRequest, IUser, ILoginUserResponse } from "@/interfaces";
import { axiosApi } from "@/services/api";
import axios from "axios";

class Api {

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

}

const api = new Api();
export default api;
