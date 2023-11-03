import { IPayslip } from "@/interfaces";
import { axiosApi } from "@/services/api";

export class Payslip {

  async getAllEmployeePayslips(cpf: string): Promise<IPayslip[]> {
    return await axiosApi.get(`/payslip/cpf/${cpf}`).then((response) => response.data);
  }

  async createPayslip(payslip: IPayslip) {
    await axiosApi.post(`/payslip`, payslip);
  }

  async getPayslipById(id: string): Promise<IPayslip> {
    return await axiosApi.get(`/payslip/id/${id}`).then((response) => response.data);
  }
}