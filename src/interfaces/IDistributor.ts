export interface Tariff {
  subgroup: number;
  start: Date;
  end: Date;
}

export default interface DistributorProps {
  id: number;
  title: string;
  cnpj?:string;
  disabled?: boolean;
  linkedUC?: Array<string>;
  tariffs?: Array<Tariff>;
  currentRoute?: string;
}