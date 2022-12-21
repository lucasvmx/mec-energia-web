import { Tariff } from "./tariffs";

export interface DistributorPropsTariffs {
  id: number;
  name: string;
  cnpj?:string;
  is_active: boolean;
  consumer_units:number;
  tariffs: Array<Tariff>;
}

export interface DistributorConsumerUnits{
  id:number;
  subgroups:Array<ConsumerUnitSubgroup>;
}

export interface CreateDistributorForm {
  name: string;
  cnpj: string;
}

export interface EditDistributorForm {
  isActive:boolean;
  name: string;
  cnpj: string;
}

export interface ConsumerUnitSubgroup{
  subgroup: string;
  consumer_units: Array<ConsumerUnit>
}
export interface ConsumerUnit{
  name:string;
  id:number;
}
export interface DistributorProps extends DistributorPropsTariffs , DistributorConsumerUnits{}