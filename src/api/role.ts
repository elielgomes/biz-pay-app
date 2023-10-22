import { IRole } from "@/interfaces";
import { axiosApi } from "@/services/api";

export class Role {

  async getAllRoles(): Promise<IRole[]> {
    return await axiosApi.get(`/role`)
      .then(response => response.data);
  }

}