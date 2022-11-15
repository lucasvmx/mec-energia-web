import { Tariff } from "./tariffs";

export default interface DistributorProps {
  id: number;
  title: string;
  cnpj?:string;
  disabled?: boolean;
  linkedUC?: Array<string>;
  tariffs: Array<Tariff>;
  currentRoute?: string;
}

export interface CreateDistributorForm {
  name: string;
  cnpj: string;
}