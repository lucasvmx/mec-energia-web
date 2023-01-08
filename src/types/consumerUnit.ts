import { TariffFlag } from "./supplier";

export interface CreateConsumerUnitForm {
  title: string;
  code: string;
  distributor: string;
  startDate: Date | null;
  supplyVoltage: number | "";
  tariffFlag: TariffFlag;
  contracted: number | "";
  peakContractedDemandInKw: number | "";
  offPeakContractedDemandInKw: number | "";
}

export interface EditConsumerUnitForm {
  isActive: boolean;
  title: string;
  code: string;
  distributor: number | "";
  startDate: Date | null;
  supplyVoltage: number | "";
  tariffFlag: TariffFlag;
  contracted: number | "";
  peakContracted: number | "";
  outOfPeakContracted: number | "";
}

export interface RenewConsumerUnitContractForm {
  supplier: string;
  startDate: Date | null;
  supplied: number | "";
  tariffType: TariffFlag;
  contracted: number | "";
  peakContracted: number | "";
  outOfPeakContracted: number | "";
}

export type ConsumerUnit = {
  id: number;
  title: string;
  postedCurrentInvoice: boolean;
  pendenciesCount: number;
  favorite: boolean;
  disabled: boolean;
};

export type ConsumerUnitsPayload = ConsumerUnit[];

export interface ConsumerUnitRequestPayload {
  name: string;
  code: string;
  isActive: boolean;
  university: number;
}

export interface ContractRequestPayload {
  startDate: Date;
  tariffFlag: string;
  peakContractedDemandInKw: number;
  offPeakContractedDemandInKw: number;
  supplyVoltage: number;
  distributor: string;
}

export interface CreateConsumerUnitRequestPayload {
  consumerUnit: ConsumerUnitRequestPayload;
  contract: ContractRequestPayload;
}
