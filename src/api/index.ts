import { Employee } from "./employee";
import { Role } from "./role";
import { Payslip } from "./payslip";


const api = {
  employee: new Employee(),
  role: new Role(),
  payslip: new Payslip(),
};
export default api;
