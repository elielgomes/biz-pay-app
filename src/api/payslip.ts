import { IPayslip, IPayslipDTO } from "@/interfaces";
import { axiosApi } from "@/services/api";

export class Payslip {

  async getAllEmployeePayslips(cpf: string): Promise<IPayslip[]> {
    return await axiosApi.get(`/payslip/cpf/${cpf}`).then((response) => response.data);
  }

  async createPayslip(payslip: IPayslipDTO) {
    await axiosApi.post(`/payslip`, payslip);
  }

  async getPayslipById(id: string): Promise<IPayslip> {
    return await axiosApi.get(`/payslip/id/${id}`).then((response) => response.data);
  }

  async updatePayslip(payslip: IPayslipDTO) {
    await axiosApi.patch(`/payslip`, payslip);
  }

  async deletePayslip(id: string) {
    await axiosApi.delete(`/payslip/${id}`);
  }
}