export enum IHumanSexCodes {
  male = 1,
  female = 2,
}

export enum IStatus {
  "Inativo" = 0,
  "Ativo" = 1,
}

export enum IMaritalStatus {
  single = 0,
  married = 1,
  separated = 2,
  divorced = 3,
  widowed = 4,
}

export enum IPermitions {
  user = 1,
  admin = 2,
}

export interface IPermition {
  id: IPermitions;
  name: string;
}

export interface IDepartment {
  id: string;
  name: string;
}

export interface IRole {
  id: string;
  name: string;
  weeklyWorkload: number;
  departmentId: string;
  department: IDepartment;
}

export interface IRoleDTO {
  id: string;
  name: string;
  weeklyWorkload: number;
  departmentId: string;
}

export interface IEmployee {
  cpf: string;
  name: string;
  status: IStatus;
  dateOfBirth: Date;
  email: string;
  phoneNumber?: string;
  cellNumber: string;
  address?: string;
  sex: IHumanSexCodes;
  password: string;
  admissionDate: Date;
  terminationDate?: Date;
  rg: string;
  nationality: string;
  maritalStatus: IMaritalStatus;
  numberOfChildren: number;
  bankName?: string;
  accountNumber?: string;
  agencyNumber?: string;
  pixKey?: string;
  permitionId: IPermitions;
  roleId: string;
  permition: IPermition;
  role: IRole;
}

export interface IEmployeeDTO {
  cpf: string;
  name: string;
  status: IStatus;
  dateOfBirth: Date;
  email: string;
  phoneNumber?: string;
  cellNumber: string;
  address?: string;
  sex: IHumanSexCodes;
  password: string;
  admissionDate: Date;
  terminationDate?: Date;
  rg: string;
  nationality: string;
  maritalStatus: IMaritalStatus;
  numberOfChildren: number;
  bankName?: string;
  accountNumber?: string;
  agencyNumber?: string;
  pixKey?: string;
  permitionId: number;
  roleId: string;
}

export interface IPayslip {
  id: string;
  dateOfIssue: Date;
  grossSalary: number;
  netSalary: number;
  discounts: number;
  bonus: number;
  inss: number;
  irrf: number;
  employeeCpf: string;
  employee: IEmployee;
}

export interface IPayslipDTO {
  id?: string;
  dateOfIssue: Date;
  grossSalary: number;
  discounts: number;
  bonus: number;
  employeeCpf?: string;
}

export interface ISignInData {
  Email: string;
  Password: string;
}

export interface ILoginUserRequest {
  Email: string;
  Password: string
}

export interface ILoginUserResponse {
  token: string;
  email: string;
  permition: IPermitions
}
