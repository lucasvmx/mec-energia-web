import { ConsumerUnitInvoiceFilter } from "./app";
import { TariffType } from "./supplier";

export interface CreateConsumerUnitForm {
  title: string;
  code: string;
  supplier: string;
  startDate: Date | null;
  supplied: number | "";
  tariffType: TariffType;
  contracted: number | "";
  peakContracted: number | "";
  outOfPeakContracted: number | "";
}

export interface EditConsumerUnitForm {
  isActive: boolean;
  title: string;
  code: string;
  supplier: string;
  startDate: Date | null;
  supplied: number | "";
  tariffType: TariffType;
  contracted: number | "";
  peakContracted: number | "";
  outOfPeakContracted: number | "";
}

export interface RenewConsumerUnitContractForm {
  supplier: string;
  startDate: Date | null;
  supplied: number | "";
  tariffType: TariffType;
  contracted: number | "";
  peakContracted: number | "";
  outOfPeakContracted: number | "";
}

export type ConsumerUnit = {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
  isFavorite: boolean;
  isCurrentEnergyBillFilled: boolean;
  pendingEnergyBillsNumber: number;
};

export type ConsumerUnitsPayload = ConsumerUnit[];

export type EnergyBill = {
  id: number;
  date: string;
  invoiceInReais: number;
  isAtypical: boolean;
  peakConsumptionInKwh: number;
  offPeakConsumptionInKwh: number;
  offPeakContractedDemandInKw: number;
  peakMeasuredDemandInKw: number;
  offPeakMeasuredDemandInKw: number;
};

export type InvoicePayload = {
  month: number;
  year: number;
  isEnergyBillPending: boolean;
  energyBill: EnergyBill | null;
};

export type InvoicesPayload = {
  [year: string]: InvoicePayload[];
};

export type InvoiceDataGridRow = {
  id: number;
  month: number;
  year: number;

  isEnergyBillPending: boolean;
  activeFilter: ConsumerUnitInvoiceFilter;

  energyBillId?: number;
  date?: string;
  invoiceInReais?: number;
  isAtypical?: boolean;
  peakConsumptionInKwh?: number;
  offPeakConsumptionInKwh?: number;
  offPeakContractedDemandInKw?: number;
  peakMeasuredDemandInKw?: number;
  offPeakMeasuredDemandInKw?: number;
};
