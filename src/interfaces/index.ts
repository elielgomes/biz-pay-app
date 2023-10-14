export enum IHumanSexCodes {
  notKnown = 0,
  male = 1,
  female = 2,
  notApplicable = 9,
}

export enum IStatus {
  inativo = 0,
  ativo = 1,
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

export interface IEmployee {
  cpf: string;
  name: string;
  status: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  cellNumber: string;
  address: string;
  sex: IHumanSexCodes;
  password: string;
  hourlyPayment: number;
  admissionDate: Date;
  terminationDate?: Date;
  rg: string;
  nationality: string;
  religion?: string;
  maritalStatus: IMaritalStatus;
  numberOfChildren: number;
  partnerName?: string;
  bankName: string;
  accountNumber: string;
  agencyNumber: string;
  pixKey: string;
  permitionId?: string;
  permition: IPermitions;
  roleId?: string;
  role: IRole;
}

export interface IPayslip {
  id: string;
  dateOfIssue: Date;
  lastEdition?: Date;
  grossSalary: number;
  netSalary: number;
  discounts: number;
  bonus: number;
  inss: number;
  irrf: number;
  employeeCpf: string;
  employee: IEmployee;
}

export interface ISignInData {
  Email: string;
  Password: string;
}

export interface IUser {
  email: string;
  permition: IPermitions
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
